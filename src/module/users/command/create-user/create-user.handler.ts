import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UsersRepository } from '../../users.repository';
import { UserEntity } from '../../entities/user.entity';
import { User } from '@prisma/client';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly userRepository: UsersRepository) {}

    async execute(command: CreateUserCommand): Promise<User> {
        const { email, passwordHash, name, birthDay } = command;
        const user = new UserEntity({ email, passwordHash, name, role: 'User', birthDay });
        return await this.userRepository.createUser(user);
    }
}
