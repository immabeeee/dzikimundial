import { Injectable } from '@nestjs/common'
import { from, Observable } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../model/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { User } from '../model/user.model'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  registerAccount(user: User): Observable<User> {
    const { login, email, password, role } = user

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) => {
        return from(
          this.userRepository.save({
            login,
            email,
            role,
            password: hashedPassword,
          }),
        ).pipe(
          map((user: User) => {
            delete user.password
            return user
          }),
        )
      }),
    )
  }

  login(user: User): Observable<string> {
    const { login, password } = user
    return this.validateUser(login, password).pipe(
      switchMap((user: User) => {
        if (user) {
          return from(this.jwtService.signAsync({ user }))
        }
      }),
    )
  }

  findUserById(id: number): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [{ id: id }],
      }),
    ).pipe(
      map((user: User) => {
        delete user.password
        return user
      }),
    )
  }

  private validateUser(login: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: [{ login: login }],
        select: ['id', 'login', 'email', 'password', 'role'],
      }),
    ).pipe(
      switchMap((user: User) => {
        return from(bcrypt.compare(password, user.password)).pipe(
          map((isValidPassword: boolean) => {
            if (isValidPassword) {
              delete user.password
              return user
            }
          }),
        )
      }),
    )
  }

  private hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12)) as Observable<string>
  }
}
