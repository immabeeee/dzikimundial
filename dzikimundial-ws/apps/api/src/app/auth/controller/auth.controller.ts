import { User } from '@dzikimundial-ws/api-interfaces'
import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DeleteResult } from 'typeorm'
import { LoggerService } from '../../shared/logger/service/logger.service'
import { AuthService } from '../service/auth.service'

@Controller('auth')
export class AuthController {
  private readonly apiName = '[AUTH API]'

  constructor(private authService: AuthService, private loggerService: LoggerService) {}

  @Post('register')
  register(@Body() user: User): Observable<User> {
    this.loggerService.log(`${this.apiName} - register new user: ${JSON.stringify(user)}`)
    return this.authService.registerAccount(user)
  }

  @Post('login')
  login(@Body() user: User): Observable<{ token: string }> {
    this.loggerService.log(`${this.apiName} - login user: ${JSON.stringify(user)}`)
    return this.authService.login(user).pipe(map((jwt: string) => ({ token: jwt })))
  }

  @Delete(':id')
  delete(@Param() id: string): Observable<DeleteResult> {
    this.loggerService.log(`${this.apiName} - delete user with id ${id}`)
    return this.authService.deleteUser(id)
  }
}
