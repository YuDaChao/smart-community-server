import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { Auth } from './decotators/auth.decorator';
import { SignInDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/signup.dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signDto: SignupDto) {
    return this.authService.signUp(signDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('refresh')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
