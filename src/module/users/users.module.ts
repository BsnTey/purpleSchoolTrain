import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { QUERIES } from './query';
import { COMMANDS } from './command';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from './users.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@common/database';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [UsersController],
    providers: [...QUERIES, ...COMMANDS, UsersService, UsersRepository, JwtService],
})
export class UsersModule {}
