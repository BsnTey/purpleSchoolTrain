import { Controller, Get} from '@nestjs/common';
import { HasRoles, RoleEnum } from '@common/decorators/roles.decorator';
import { User } from '@common/decorators/user.decorator';
import { UserContext } from '../auth/types/user.context.interface';
import { UsersService } from './users.service';
import { UserProfileEntity } from './entities/profile.entity';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @HasRoles([RoleEnum.USER, RoleEnum.ADMIN])
    @Get('profile')
    async getMyProfile(@User() user: UserContext): Promise<UserProfileEntity> {
        return this.usersService.getProfileByUuid(user.sub);
    }
}
