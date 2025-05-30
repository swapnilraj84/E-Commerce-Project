import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignup } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignin } from './dto/user.signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('signup')
  async signup(@Body() usersignup:UserSignup): Promise<UserEntity> {
    return await this.usersService.signup(usersignup);
  }

  @Post('signin')
  async signin(@Body() usersignin:UserSignin){
    const user = await this.usersService.signin(usersignin);
    const accessToken = await this.usersService.accessToken(user);
    return{accessToken, user};
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
