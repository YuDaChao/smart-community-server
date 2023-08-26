import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_TOKEN_SECRET,
  accessTokenExpiresIn: parseInt(
    process.env.JWT_ACCESS_TOKEN_EXPIRESIN ?? '3600', // 一小时
    10,
  ),
  refreshTokenExpiresIn: parseInt(
    process.env.JWT_REFRESH_TOKEN_EXPIRESIN ?? '86400', // 一天
    10,
  ),
}));
