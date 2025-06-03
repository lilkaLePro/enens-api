import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "jsonwebtoken";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constatnt";
import { GetUserById } from "src/helpers/get-user-by-id";

@Injectable()
export class JWTStrtegie extends PassportStrategy(Strategy) {
  constructor(private readonly getUserById: GetUserById ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: JwtPayload) {
    const user = await this.getUserById.execute(payload.sub);
    if (!user || !payload) {
      throw new UnauthorizedException();
    }
    return user;
  }
}