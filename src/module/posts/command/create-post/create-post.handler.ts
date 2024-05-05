import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostEntity } from '../../entities/post.entity';
import { PostsRepository } from '../../posts.repository';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
    constructor(private readonly postRepository: PostsRepository) {}

    async execute(command: CreatePostCommand) {
        const { text, title, userUuid } = command;
        const post = new PostEntity({ text, title, userUuid });
        return await this.postRepository.createPost(post);
    }
}
