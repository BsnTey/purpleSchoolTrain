import { Post } from '@prisma/client';

export class PostEntity implements Post {
    uuid: string;
    text: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userUuid: string;

    constructor(post: Partial<Post>) {
        Object.assign(this, post);
        return this;
    }
}
