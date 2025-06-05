import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AuthJWTPayload } from 'src/modules/user/dtos/user.DTO';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }
  validate(payload: AuthJWTPayload) {
    const { userId } = payload.sub;
    const JWTUser = this.authService.validateJWTUser(userId);
    console.log(userId, JWTUser);
    
    return JWTUser;
  }

}
