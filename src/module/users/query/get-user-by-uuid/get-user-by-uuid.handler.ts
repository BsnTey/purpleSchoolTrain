import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';
import { GetUserByUuidQuery } from './get-user-by-uuid.query';
import { UserEntity } from '../../entities/user.entity';
import { UsersRepository } from '../../users.repository';

@QueryHandler(GetUserByUuidQuery)
export class GetUserByUuidHandler implements IQueryHandler<GetUserByUuidQuery> {
    constructor(private readonly userRepository: UsersRepository) {}

    async execute(query: GetUserByUuidQuery): Promise<User | null> {
        const { uuid } = query;
        const user = await this.userRepository.getUserById(uuid);
        if (!user) {
            return null;
        }
        return new UserEntity(user);
    }
}
