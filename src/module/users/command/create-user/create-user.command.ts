import { UserRole } from '../../entities/user.entity';

export class CreateUserCommand {
    constructor(
        public readonly email: string,
        public readonly name: string | null = null,
        public readonly passwordHash: string,
        public readonly birthDay: Date | null = null,
        public readonly role: UserRole = 'User',
    ) {}
}
