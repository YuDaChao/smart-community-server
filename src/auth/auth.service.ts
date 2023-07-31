import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hashing.service';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(
    { userName, password, avatar, communityId }: SignupDto,
    role: Role,
  ) {
    // 判断用户名是否已存在
    const user = await this.prismaService.user.findUnique({
      where: { userName },
    });
    if (user) {
      throw new ConflictException('用户已存在');
    }
    // 密码加密
    const hashedPassword = await this.hashingService.hash(password);
    // 创建用户
    const createUser = await this.prismaService.user.create({
      data: {
        userName,
        password: hashedPassword,
        role: role,
        createdAt: new Date(),
        avatar: avatar ?? `https://robohash.org/${userName}?set=4`,
        communityId,
      },
    });
    return {
      ...createUser,
      password: undefined,
    };
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

  async generateTokens(user: User) {
    const accessToken = await this.signToken(
      user.id,
      this.jwtConf.accessTokenExpiresIn,
      { name: user.userName, communityId: user.communityId },
    );
    const refreshAccessToken = await this.signToken(
      user.id,
      this.jwtConf.refreshTokenExpiresIn,
    );
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
