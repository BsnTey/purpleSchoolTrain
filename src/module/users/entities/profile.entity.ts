import { UserEntity } from './user.entity';

export type UserRole = 'User' | 'Admin';

export class UserProfileEntity implements Partial<UserEntity> {
    uuid: string;
    email: string;
    role: UserRole;
    name: string;
    birthDay: Date;

    constructor(user: UserEntity) {
        this.uuid = user.uuid;
        this.email = user.email;
        this.role = user.role;
        this.name = user.name;
        this.birthDay = user.birthDay;
    }
}
