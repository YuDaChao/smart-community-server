import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import jwtConfig from '../commons/config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { RequestUser } from '../commons/constant/jwt.constant';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  async signUp({ userName, password, avatar, communityId, roleId }: SignupDto) {
    // 判断用户名是否已存在
    const user = await this.prismaService.user.findUnique({
      where: { userName },
    });
    if (user) {
      throw new ConflictException('用户已存在！');
    }
    // 密码加密
    const hashedPassword = await this.hashingService.hash(password);
    try {
      // 创建用户
      const createUser = await this.prismaService.user.create({
        data: {
          userName,
          password: hashedPassword,
          createdAt: new Date(),
          avatar: avatar ?? `https://robohash.org/${userName}?set=4`,
          communityId,
          roleId,
        },
      });
      return {
        ...createUser,
        password: undefined,
      };
    } catch (e) {
      if (e.code === 'P2003') {
        throw new BadRequestException('参数错误！');
      }
      throw new InternalServerErrorException('服务异常！');
    }
  }

  /**
   * 登录
   * @param userName 用户名
   * @param password 密码
   */
  async signIn({ userName, password }: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { userName },
    });
    if (!user) {
      throw new NotFoundException('用户名或密码错误');
    }
    const hashedPassword = user.password;
    const isValidated = await this.hashingService.compare(
      password,
      hashedPassword,
    );
    if (!isValidated) {
      throw new NotFoundException('用户名或密码错误');
    }
    return await this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const { id, refreshTokenId } = await this.jwtService.verifyAsync<
        Omit<RequestUser, 'communityId'> & { refreshTokenId: string }
      >(refreshToken, {
        secret: this.jwtConf.secret,
      });
      const validate = await this.refreshTokenIdsStorage.validate(
        id,
        refreshTokenId,
      );
      if (validate) {
        await this.refreshTokenIdsStorage.invalidate(id);
      } else {
        throw new Error('refreshToken invalid');
      }
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshAccessToken] = await Promise.all([
      this.signToken(user.id, this.jwtConf.accessTokenExpiresIn, {
        name: user.userName,
        communityId: user.communityId,
      }),
      this.signToken(user.id, this.jwtConf.refreshTokenExpiresIn, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return { accessToken, refreshAccessToken };
  }

  /**
   * jwt token 签名
   * @param userId 用户ID
   * @param expiresIn 签名过期时间
   * @param payload 荷载
   */
  async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        id: userId,
        ...payload,
      },
      {
        secret: this.jwtConf.secret,
        expiresIn,
      },
    );
  }
}
