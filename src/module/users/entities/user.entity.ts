import { User } from '@prisma/client';

export type UserRole = 'User' | 'Admin';

export class UserEntity implements User {
    uuid: string;
    email: string;
    role: UserRole;
    name: string;
    birthDay: Date;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
        return this;
    }
}
