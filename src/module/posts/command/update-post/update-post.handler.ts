import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from './update-post.command';
import { PostsRepository } from '../../posts.repository';
import { PostUuid } from '../../types/posts.interface';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
    constructor(private readonly postRepository: PostsRepository) {}

    async execute({ text, title, postUuid }: UpdatePostCommand): Promise<PostUuid> {
        return this.postRepository.updatePostById({ text, title, postUuid });
    }
}
