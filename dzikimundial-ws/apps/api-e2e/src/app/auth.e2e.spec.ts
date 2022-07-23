import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from './../../../api/src/app/app.module'
import { Role, User } from '@dzikimundial-ws/api-interfaces'
import { getLogin, getEmail, getPassword, deleteUser, createUser, loginUser } from './helpers/auth/user.helpers'
import { DeleteResult } from 'typeorm'

describe('Auth API (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should create a new admin user', () => {
    // given
    const login = getLogin()
    const email = getEmail()
    const password = getPassword()

    // when
    return (
      createUser(app.getHttpServer(), { login, email, password, role: Role.ADMIN })
        // then
        .expect(201)
        .expect(({ body }: { body: User }) => {
          expect(body.login).toEqual(login)
          expect(body.email).toEqual(email)
          expect(body.role).toEqual(Role.ADMIN)
        })
        // remove created data
        .then(({ body }) => deleteUser(app.getHttpServer(), body.id))
    )
  })

  it('should create a new premium user', () => {
    // given
    const login = getLogin()
    const email = getEmail()
    const password = getPassword()

    // when
    return (
      createUser(app.getHttpServer(), { login, email, password, role: Role.PREMIUM })
        // then
        .expect(201)
        .expect(({ body }: { body: User }) => {
          expect(body.login).toEqual(login)
          expect(body.email).toEqual(email)
          expect(body.role).toEqual(Role.PREMIUM)
        })
        // remove created data
        .then(({ body }) => deleteUser(app.getHttpServer(), body.id))
    )
  })

  it('should create a new user', () => {
    // given
    const login = getLogin()
    const email = getEmail()
    const password = getPassword()

    // when
    return (
      createUser(app.getHttpServer(), { login, email, password, role: Role.USER })
        // then
        .expect(201)
        .expect(({ body }: { body: User }) => {
          expect(body.login).toEqual(login)
          expect(body.email).toEqual(email)
          expect(body.role).toEqual(Role.USER)
        })
        // remove created data
        .then(({ body }) => deleteUser(app.getHttpServer(), body.id))
    )
  })

  it('should delete user', () => {
    // given
    const login = getLogin()
    const email = getEmail()
    const password = getPassword()

    // when
    return (
      createUser(app.getHttpServer(), { login, email, password, role: Role.USER })
        // then
        .expect(201)
        // remove created data
        .then(({ body }: { body: User }) =>
          deleteUser(app.getHttpServer(), body.id)
            .expect(200)
            .expect(({ body }: { body: DeleteResult }) => {
              expect(body.affected).toEqual(1)
            }),
        )
    )
  })

  it('login with credentials', () => {
    // given
    const login = getLogin()
    const email = getEmail()
    const password = getPassword()
    let id: string

    // when
    return (
      createUser(app.getHttpServer(), { login, email, password, role: Role.USER })
        // then
        .expect(201)
        .then(({ body }: { body: User }) => {
          id = body.id
          return loginUser(app.getHttpServer(), body.login, password).expect(201)
        })
        // remove created data
        .then(() => deleteUser(app.getHttpServer(), id).expect(200))
    )
  })
})
