import { IsEmail , IsNotEmpty , IsString , MinLength } from "class-validator";

export class UserSignin{
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string'})
    @MinLength(5, {message: 'Password must be at least 5 characters long'})
    password: string;
}