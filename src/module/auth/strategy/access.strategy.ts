import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJWTPayload } from '../types/auth.interface';
import { UserContext } from '../types/user.context.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('ACCESS_TOKEN_JWT_SECRET'),
            signOptions: {
                expiresIn: configService.getOrThrow('ACCESS_TOKEN_EXPIRATION'),
            },
        });
    }

    validate(data: { payload: IJWTPayload }): UserContext {
        return { userId: data.payload.sub, userRole: data.payload.role };
    }
}
