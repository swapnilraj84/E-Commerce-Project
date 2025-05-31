import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignup } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignin } from './dto/user.signin.dto';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signup(usersignup: UserSignup): Promise<UserEntity> {
    const userExists = await this.finduserbyemail(usersignup.email);
    if (userExists) {
      throw new BadRequestException('User already exists with this email');
    }
    usersignup.password = await hash(usersignup.password, 10);
    const user = this.userRepository.create(usersignup);
    return await this.userRepository.save(user);
  }

  async signin(usersignin: UserSignin){
  const userexists = await this.finduserbyemail(usersignin.email);
  if (!userexists) {
    throw new BadRequestException('User does not exist with this email');
  }
  
  console.log('Password from request:', usersignin.password);
  console.log('Password from database:', userexists.password);
  
  if (!usersignin.password) {
    throw new BadRequestException('Password is required in request');
  }
  
  if (!userexists.password) {
    throw new BadRequestException('No password found for this user in database');
  }
  
  const matchpassword = await compare(usersignin.password, userexists.password);
  if(!matchpassword){
    throw new BadRequestException('Password is incorrect');
  }
  return userexists;
}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async finduserbyemail(email:string){
    return await this.userRepository.findOne({
    where: { email },
    select: ['id', 'email', 'name', 'password', 'roles', 'createdAt', 'updatedAt']
  });
  }

async accessToken(user: UserEntity) {
  const payload = { id: user.id, email: user.email };
  const secret = process.env.ACCESS_TOKEN_SECRET_KEY as string;
  const options = { expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRES_IN as string };
  
  return (jwt as any).sign(payload, secret, options);
}
}
