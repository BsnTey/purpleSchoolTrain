import { Module } from '@nestjs/common';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { PostsModule } from './module/posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        UsersModule,
        PostsModule,
    ],
    providers: [],
})
export class AppModule {}
