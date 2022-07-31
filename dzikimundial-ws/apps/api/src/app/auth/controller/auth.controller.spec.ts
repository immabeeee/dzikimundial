import { Test, TestingModule } from '@nestjs/testing'
import { LoggerModule } from './../../shared/logger/logger.module'
import { AuthController } from './auth.controller'
import { AuthService } from './../service/auth.service'
import { CreateUserRequest, LoginUserRequest, Role } from '@dzikimundial-ws/api-interfaces'

describe('AuthController', () => {
  let controller: AuthController
  const testIdUUID = 'e467c2a2-fde8-46a1-9eee-eb661166060f'
  const testToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjhjMjkyMmYtZTkwNy00ZGFjLWFmNTQ
  tYzU1NzQ4Mzk3YjI0IiwibG9naW4iOiJrb3JkaSIsImVtYWlsIjoia29yZGlAdGVzdC5jb20iLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNj
  U4NjU4NTQ3LCJleHAiOjE2NTg2NjIxNDd9.cBQ6I6guxq_TfrKUc1402K6HPlqU6lu25UVnU7RSdk4`

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [LoggerModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerAccount: jest.fn((req: CreateUserRequest) => {
              return {
                ...req,
                id: testIdUUID,
              }
            }),
            login: jest.fn(() => {
              return {
                token: testToken,
              }
            }),
            deleteUser: jest.fn(() => {
              return {
                raw: [],
                affected: 1,
              }
            }),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a new user', () => {
    // given
    const req1: CreateUserRequest = {
      email: 'lorem1@gmail.com',
      login: 'lorem1',
      password: 'lorem',
      role: Role.ADMIN,
    }

    // when
    const result1 = controller.register(req1)

    // then
    expect(result1).toEqual({
      ...req1,
      id: testIdUUID,
    })
  })

  it('should login a user', () => {
    // given
    const req1: LoginUserRequest = {
      login: 'lorem1',
      password: 'lorem',
    }

    // when
    const result1 = controller.login(req1)

    // then
    expect(result1).toEqual({
      token: testToken,
    })
  })

  it('should delete a user', () => {
    // given
    const id: string = testIdUUID

    // when
    const result1 = controller.delete(id)

    // then
    expect(result1).toEqual({
      raw: [],
      affected: 1,
    })
  })
})
