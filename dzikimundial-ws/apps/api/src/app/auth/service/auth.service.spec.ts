import { AuthService } from './auth.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../model/user.entity'
import { LoggerModule } from './../../shared/logger/logger.module'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import { Role, User } from '@dzikimundial-ws/api-interfaces'
import { of, take } from 'rxjs'

export const mockRepository = jest.fn(() => ({
    save: jest.fn(),
    metadata: {
      columns: [],
      relations: [],
    },
  }));

describe('AuthService', () => {
  let service: AuthService
  let jwtService: JwtService
  let userRepository: Repository<UserEntity>

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        AuthService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: mockRepository
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    })
    .compile()

    service = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(jwtService).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('createUser', () => {
    it('should encode password correctly', async () => {
      // given
      ;(jest.spyOn(service, 'hashPassword') as any).mockReturnValueOnce(of('123'))

      const user1: User = {
        login: 'user1',
        email: 'user1@user1.com',
        password: 'testPassword123',
        role: Role.ADMIN,
      }
      // when
      service.registerAccount(user1)

      // then

      expect(service.hashPassword).toHaveBeenCalledWith('testPassword123')
    })

    it('should call userRepository.save with correct params', async () => {
      // given
      ;(jest.spyOn(service, 'hashPassword') as any).mockReturnValueOnce(of('123'))

      const user1: User = {
        login: 'user1',
        email: 'user1@user1.com',
        password: 'testPassword123',
        role: Role.ADMIN,
      }
      // when

      jest.spyOn(userRepository, 'save').mockReturnValueOnce({
          email: "user1@user1.com", 
          id: "lorem", 
          login: "user1", 
          password: "123", 
          role: "admin"
        } as any);

      service.registerAccount(user1).pipe(take(1)).subscribe()

      // then
      expect(userRepository.save).toHaveBeenCalledWith({
        email: 'user1@user1.com',
        login: 'user1',
        password: '123',
        role: Role.ADMIN,
      })
      expect(userRepository.save).toReturnWith(
        {
            email: "user1@user1.com", 
            id: "lorem", 
            login: "user1", 
            password: "123", 
            role: "admin"
          }
      )
    })
  })
})
