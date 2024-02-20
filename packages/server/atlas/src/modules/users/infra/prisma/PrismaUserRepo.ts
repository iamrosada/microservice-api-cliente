import { DomainEvents } from '@server/shared/src/core/domain/events/DomainEvents';

import { prisma } from '@infra/prisma/client';
import { User } from '@modules/users/domain/User';
import { UserEmail } from '@modules/users/domain/UserEmail';
import { UserMap } from '@modules/users/mappers/UserMap';
import { IUserRepo } from '@modules/users/repositories/IUserRepo';

export class PrismaUserRepo implements IUserRepo {
  async findByEmail(email: string | UserEmail): Promise<User> {
    const rawUser = await prisma.user.findOne({
      where: {
        email: email instanceof UserEmail ? email.value : email,
      },
    });

    if (!rawUser) {
      return null;
    }

    return UserMap.toDomain(rawUser);
  }

  async findById(id: string): Promise<User> {
    const rawUser = await prisma.user.findOne({
      where: { id },
    });

    if (!rawUser) {
      return null;
    }

    return UserMap.toDomain(rawUser);
  }

  async save(user: User): Promise<void> {
    const data = await UserMap.toPersistence(user);

    await prisma.user.upsert({
      where: { email: user.email.value },
      update: data,
      create: data,
    });

    DomainEvents.dispatchEventsForAggregate(user.id);
  }
}
