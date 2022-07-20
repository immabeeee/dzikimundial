import { Body, Controller, Post } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoggerService } from '../../shared/logger/service/logger.service'
import { User } from '../model/user.model'
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
}
