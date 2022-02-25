import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');
  async getUsers(search?: string): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere('(LOWER(user.name) LIKE LOWER(:search))', {
        search: `%${search}%`,
      });
    }
    try {
      const users = await query.getMany();
      return users;
    } catch (error) {
      this.logger.error(`Failed to get users`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, idType } = createUserDto;
    const user = this.create({
      name,
      idType,
    });
    await this.save(user);
    return user;
  }
}
