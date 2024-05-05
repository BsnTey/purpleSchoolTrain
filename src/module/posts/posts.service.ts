import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from './dto/create-post.dto';
import { PostUuid } from './types/posts.interface';
import { GetPostById } from './query/get-post-by-uuid';
import { CreatePostCommand } from './command/create-post';
import { POST_NO_RIGHTS_ERROR, POST_NOT_FOUND_ERROR } from './constants/posts.constants';
import { DeletePostCommand } from './command/delete-post';
import { Post } from '@prisma/client';
import { GivenPostEntity } from './entities/givenPost.entity';
import { UpdatePostCommand } from './command/update-post';

@Injectable()
export class PostsService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async createPost(userUuid: string, createPostDto: CreatePostDto): Promise<PostUuid> {
        const { text, title } = createPostDto;

        const createdPost = await this.commandBus.execute<CreatePostCommand>(new CreatePostCommand(text, title, userUuid));
        return { uuid: createdPost.uuid };
    }

    async getPostById({ uuid }: PostUuid): Promise<GivenPostEntity> {
        const existPost: Post | null = await this.queryBus.execute(new GetPostById(uuid));
        if (!existPost) {
            throw new NotFoundException(POST_NOT_FOUND_ERROR);
        }
        return new GivenPostEntity(existPost);
    }

    async updatePostById(userUuid: string, postUuid: string, createPostDto: CreatePostDto): Promise<PostUuid> {
        const { text, title } = createPostDto;
        const existPost: Post | null = await this.queryBus.execute(new GetPostById(postUuid));
        if (!existPost) {
            throw new NotFoundException(POST_NOT_FOUND_ERROR);
        }
        if (existPost.userUuid != userUuid) {
            throw new ForbiddenException(POST_NO_RIGHTS_ERROR);
        }

        const updatedPost = await this.commandBus.execute<UpdatePostCommand>(new UpdatePostCommand(text, title, postUuid));
        return { uuid: updatedPost.uuid };
    }

    async deletePostById(userUuid: string, postUuid: string): Promise<PostUuid> {
        const existPost: Post | null = await this.queryBus.execute(new GetPostById(postUuid));
        if (!existPost) {
            throw new NotFoundException(POST_NOT_FOUND_ERROR);
        }
        if (existPost.userUuid != userUuid) {
            throw new ForbiddenException(POST_NO_RIGHTS_ERROR);
        }

        const result: PostUuid = await this.commandBus.execute(new DeletePostCommand(postUuid));
        if (!result) {
            throw new InternalServerErrorException();
        }
        return result;
    }
}
