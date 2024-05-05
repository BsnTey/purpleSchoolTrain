import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUserByUuidQuery } from './query/get-user-by-uuid';
import { UserProfileEntity } from './entities/profile.entity';

@Injectable()
export class UsersService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {}

    async getProfileByUuid(uuid: string): Promise<UserProfileEntity> {
        const user = await this.queryBus.execute<GetUserByUuidQuery>(new GetUserByUuidQuery(uuid));
        return new UserProfileEntity(user);
    }
}
