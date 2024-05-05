import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { UserEntity } from '../../entities/user.entity';
import { UsersRepository } from '../../users.repository';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler<GetUserByEmailQuery> {
    constructor(private readonly userRepository: UsersRepository) {}

    async execute(query: GetUserByEmailQuery): Promise<User | null> {
        const { email } = query;
        const user = await this.userRepository.getUserByEmail(email.toLowerCase());
        if (!user) {
            return null;
        }
        return new UserEntity(user);
    }
}
