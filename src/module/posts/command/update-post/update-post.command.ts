export class UpdatePostCommand {
    constructor(
        public readonly text: string,
        public readonly title: string,
        public readonly postUuid: string,
    ) {}
}
