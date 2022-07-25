import { CreateUserRequest, LoginUserRequest, LoginUserResponse, User } from '@dzikimundial-ws/api-interfaces'
import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DeleteResult } from 'typeorm'
import { LoggerService } from '../../shared/logger/service/logger.service'
import { CreateUserDto } from '../model/dto/create-user.dto.model'
import { LoginUserDto } from '../model/dto/login-user.dto.model'
import { AuthService } from '../service/auth.service'

@Controller('auth')
export class AuthController {
  private readonly apiName = '[AUTH API]'

  constructor(private authService: AuthService, private loggerService: LoggerService) {}

  @Post('register')
  register(@Body() body: CreateUserDto): Observable<User> {
    this.loggerService.log(`${this.apiName} - register new user: ${body.login} (${body.email})}`)
    return this.authService.registerAccount(body)
  }

  @Post('login')
  login(@Body() body: LoginUserDto): Observable<LoginUserResponse> {
    this.loggerService.log(`${this.apiName} - login user: ${body.login}`)
    return this.authService.login(body)
  }

  @Delete(':id')
  delete(@Param() id: string): Observable<DeleteResult> {
    this.loggerService.log(`${this.apiName} - delete user with id ${id}`)
    return this.authService.deleteUser(id)
  }
}
