import { LoginUserRequest } from '@dzikimundial-ws/api-interfaces'
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginUserDto implements LoginUserRequest {
  @IsNotEmpty()
  @IsString()
  login: string

  @IsNotEmpty()
  @IsString()
  password: string
}
