import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/database/prisma.service';
import { User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUser({ email, name, passwordHash, birthDay }: UserEntity): Promise<User> {
        return this.prisma.user.create({
            data: { email, name, passwordHash, birthDay },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async getUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                uuid: id,
            },
        });
    }
}
