import { CreateUserRequest, Role } from '@dzikimundial-ws/api-interfaces'
import { IsString, IsNotEmpty, IsEnum, IsEmail } from 'class-validator'

export class CreateUserDto implements CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role
}
