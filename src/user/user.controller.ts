import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './dto/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(@Query('search') search?: string): Promise<User[]> {
    return this.userService.getUsers(search);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserbyId(@Param('id') id: string): Promise<User> {
    return this.userService.getUserbyId(id);
  }

  @Put('/:id/update')
  updateUserbyId(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id/delete')
  deleteUserbyId(@Param('id') id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
