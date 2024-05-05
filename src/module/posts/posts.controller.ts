import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import { UserContext } from '../auth/types/user.context.interface';
import { PostsService } from './posts.service';
import { CreatePostDto, CreatePostResponseDto } from './dto/create-post.dto';
import { PostUuid } from './types/posts.interface';
import { GivenPostEntity } from './entities/givenPost.entity';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) {
    }

    @HasRoles([RoleEnum.USER, RoleEnum.ADMIN])
    @Post()
    async createPost(@User() user: UserContext, @Body() createPostDto: CreatePostDto): Promise<CreatePostResponseDto> {
        return await this.postsService.createPost(user.sub, createPostDto);
    }

    @HasRoles([RoleEnum.USER])
    @Patch(':id')
    async updatePost(
        @User() user: UserContext,
        @Param('id', ParseUUIDPipe) uuid: string,
        @Body() updatePostDto: CreatePostDto,
    ): Promise<CreatePostResponseDto> {
        return await this.postsService.updatePostById(user.sub, uuid, updatePostDto);
    }

    @HasRoles([RoleEnum.USER, RoleEnum.ADMIN])
    @Delete(':id')
    async deletePost(@User() user: UserContext, @Param('id', ParseUUIDPipe) uuid: string): Promise<PostUuid> {
        return await this.postsService.deletePostById(user.sub, uuid);
    }

    @Get(':id')
    async getPostById(@Param('id', ParseUUIDPipe) uuid: string): Promise<GivenPostEntity> {
        return await this.postsService.getPostById({ uuid });
    }
}
