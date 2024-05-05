import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from './delete-post.command';
import { Post } from '@prisma/client';
import { PostsRepository } from '../../posts.repository';
import { PostUuid } from '../../types/posts.interface';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand, Pick<Post, 'uuid'>> {
    constructor(private readonly postRepository: PostsRepository) {}

    async execute({ postUuid }: DeletePostCommand): Promise<PostUuid> {
        return this.postRepository.deletePostById(postUuid);
    }
}
