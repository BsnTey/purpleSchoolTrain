import { Post } from '@prisma/client';

export class GivenPostEntity implements Partial<Post> {
    uuid: string;
    text: string;
    title: string;
    userUuid: string;

    constructor(post: Post) {
        this.uuid = post.uuid;
        this.text = post.text;
        this.title = post.title;
        this.userUuid = post.userUuid;
    }
}
