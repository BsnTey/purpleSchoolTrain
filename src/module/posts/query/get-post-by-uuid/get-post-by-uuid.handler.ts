import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPostById } from './get-post-by-uuid.query';
import { PostsRepository } from '../../posts.repository';
import { Post } from '@prisma/client';

@QueryHandler(GetPostById)
export class GetPostByIdHandler implements IQueryHandler<GetPostById> {
    constructor(private readonly postRepository: PostsRepository) {}
    execute({ uuid }: GetPostById): Promise<Post | null> {
        return this.postRepository.getPostById(uuid);
    }
}
