import { PrismaService } from '@common/database/prisma.service';
import { Post } from '@prisma/client';
import { PostEntity } from './entities/post.entity';
import { Injectable } from '@nestjs/common';
import { PostUuid } from './types/posts.interface';
import { UpdatePostCommand } from './command/update-post';

@Injectable()
export class PostsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createPost({ text, title, userUuid }: PostEntity): Promise<Post> {
        return this.prisma.post.create({
            data: {
                text,
                title,
                user: {
                    connect: {
                        uuid: userUuid,
                    },
                },
            },
        });
    }

    async updatePostById({ text, title, postUuid }: UpdatePostCommand): Promise<PostUuid> {
        return this.prisma.post.update({
            where: { uuid: postUuid },
            data: { text, title, updatedAt: new Date() },
            select: { uuid: true },
        });
    }

    async getPostById(postUuid: string): Promise<Post | null> {
        return this.prisma.post.findFirst({
            where: { uuid: postUuid },
        });
    }

    async deletePostById(postUuid: string): Promise<PostUuid> {
        const { uuid } = await this.prisma.post.delete({
            where: { uuid: postUuid },
        });

        return { uuid };
    }
}
