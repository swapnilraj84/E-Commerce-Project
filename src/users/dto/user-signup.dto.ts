import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignup{
    @IsNotEmpty({message: 'Name is required'})
    @IsString({message: 'Name must be a string'})
    name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(5, {message: 'Password must be at least 5 characters long'})
    password: string;
}