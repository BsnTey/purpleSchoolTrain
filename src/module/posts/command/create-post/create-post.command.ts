export class CreatePostCommand {
    constructor(
        public readonly text: string,
        public readonly title: string,
        public readonly userUuid: string,
    ) {}
}
