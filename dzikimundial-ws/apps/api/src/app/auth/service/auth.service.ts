import { Injectable } from '@nestjs/common'
import { from, Observable, throwError } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../model/user.entity'
import { DeleteResult, Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import {
  CreateUserRequest,
  CreatUserResponse,
  LoginUserRequest,
  LoginUserResponse,
  User,
} from '@dzikimundial-ws/api-interfaces'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  registerAccount(req: CreateUserRequest): Observable<CreatUserResponse> {
    const { login, email, password, role } = req

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

  login(req: LoginUserRequest): Observable<LoginUserResponse> {
    const { login, password } = req
    return this.validateUser(login, password)
      .pipe(
        switchMap((user: User) => {
          if (user) {
            return from(this.jwtService.signAsync({ user }))
          }
        }),
      )
      .pipe(
        map((jwt: string) => {
          return { token: jwt }
        }),
      )
  }

  findUserById(id: string): Observable<User> {
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

  deleteUser(id: string): Observable<DeleteResult> {
    return from(this.userRepository.delete(id))
  }

  public hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12)) as Observable<string>
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
}
