import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  getUsers(search?: string): Promise<User[]> {
    console.log(search);
    return this.usersRepository.getUsers(search);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async getUserbyId(id: string): Promise<User> {
    const found = await this.usersRepository.findOne({ id });
    if (!found) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return found;
  }

  async updateUser(
    id: string,
    updateUserDto: CreateUserDto,
  ): Promise<UpdateResult> {
    const userobj = await this.getUserbyId(id);
    return await this.usersRepository.update(userobj, updateUserDto);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const userobj = await this.getUserbyId(id);
    return await this.usersRepository.delete(userobj);
  }
}
