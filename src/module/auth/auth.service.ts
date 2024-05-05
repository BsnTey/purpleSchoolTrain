import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserCommand } from '../users/command/create-user';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './constants/auth.constants';
import { GetUserByEmailQuery } from '../users/query/get-user-by-email';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '@prisma/client';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { AuthenticationProvider } from './auth.provider';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { IJWTPayload, IUserJwtPayload } from './types/auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private jwtService: JwtService,
    ) {}

    private createJwtPayload(user: IUserJwtPayload): IJWTPayload {
        return {
            sub: user.uuid,
            role: user.role,
        };
    }

    private createJwtToken(payload: object): string {
        return this.jwtService.sign(payload);
    }

    async register(regDto: RegisterDto): Promise<RegisterResponseDto> {
        const { email, password, name, birthDay } = regDto;

        const existUser = await this.queryBus.execute<GetUserByEmailQuery, UserEntity>(new GetUserByEmailQuery(email));
        if (existUser) {
            throw new BadRequestException(ALREADY_REGISTERED_ERROR);
        }
        const passwordHash = await AuthenticationProvider.generateHash(password);

        const createdUser = await this.commandBus.execute<CreateUserCommand, User>(
            new CreateUserCommand(email, name, passwordHash, birthDay),
        );
        const payload = this.createJwtPayload(createdUser);

        const accessToken = this.createJwtToken(payload);
        return { accessToken };
    }

    async login(logDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password } = logDto;

        const existUser = await this.queryBus.execute<GetUserByEmailQuery, UserEntity>(new GetUserByEmailQuery(email));
        if (!existUser) {
            throw new BadRequestException(USER_NOT_FOUND_ERROR);
        }
        const passwordHashUser = existUser.passwordHash;

        const isPasswordValid = await AuthenticationProvider.validateHash(password, passwordHashUser);
        if (!isPasswordValid) {
            throw new BadRequestException(WRONG_PASSWORD_ERROR);
        }
        const payload = this.createJwtPayload(existUser);

        const accessToken = this.createJwtToken(payload);
        return { accessToken };
    }
}
