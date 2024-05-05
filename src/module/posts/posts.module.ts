import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '@common/database';
import { PostsRepository } from './posts.repository';
import { UsersRepository } from '../users/users.repository';
import { UsersModule } from '../users/users.module';
import { PostsService } from './posts.service';
import { QUERIES } from './query';
import { COMMANDS } from './command';

@Module({
    imports: [DatabaseModule, CqrsModule, UsersModule],
    controllers: [PostsController],
    providers: [...QUERIES, ...COMMANDS, PostsRepository, UsersRepository, PostsService],
})
export class PostsModule {}
