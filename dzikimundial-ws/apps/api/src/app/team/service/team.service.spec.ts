import { TeamService } from './team.service'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { TeamEntity } from '../model/team.entity'
import { LoggerModule } from './../../shared/logger/logger.module'
import { DeleteResult, Repository } from 'typeorm'
import { CreateTeamRequest, CreateTeamResponse, Role, UpdateTeamRequest, User } from '@dzikimundial-ws/api-interfaces'
import { take } from 'rxjs'

export const mockRepository = jest.fn(() => ({
  save: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  metadata: {
    columns: [],
    relations: [],
  },
}))

describe('TeamService', () => {
  let service: TeamService
  let teamRepository: Repository<TeamEntity>

  const TEAM_REPOSITORY_TOKEN = getRepositoryToken(TeamEntity)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule],
      providers: [
        TeamService,
        {
          provide: TEAM_REPOSITORY_TOKEN,
          useClass: mockRepository,
        },
      ],
    }).compile()

    service = module.get<TeamService>(TeamService)
    teamRepository = module.get<Repository<TeamEntity>>(TEAM_REPOSITORY_TOKEN)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(teamRepository).toBeDefined()
  })

  describe('create team', () => {
    it('should call teamRespository.save with correct params', async () => {
      // given
      const user1: User = {
        login: 'user1',
        email: 'user1@user1.com',
        password: 'testPassword123',
        role: Role.ADMIN,
        id: 'userId',
      }
      const req1: CreateTeamRequest = {
        description: 'description',
        name: 'name',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg/1280px-Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg.png',
      }

      const createdAt: Date = new Date()
      const teamId = 'teamId'

      // when
      jest.spyOn(teamRepository, 'save').mockReturnValueOnce(
        Promise.resolve({
          ...req1,
          createdAt: createdAt,
          createdBy: user1.id,
          updatedAt: createdAt,
          updatedBy: user1.id,
          id: teamId,
        }),
      )

      service
        .createTeam(req1, user1)
        .pipe(take(1))
        .subscribe((team: CreateTeamResponse) => {
          expect(team).toEqual({
            id: teamId,
            description: req1.description,
            name: req1.name,
            logo: req1.logo,
            createdAt: createdAt,
            createdBy: user1.id,
            updatedAt: createdAt,
            updatedBy: user1.id,
          })
        })

      // then

      expect(teamRepository.save).toHaveBeenCalled()

      expect(teamRepository.save).toHaveBeenCalledWith({
        description: req1.description,
        logo: req1.logo,
        name: req1.name,
        createdBy: user1.id,
        updatedBy: user1.id,
      })
    })
  })

  describe('update team', () => {
    it('should call teamRespository.update with correct params', async () => {
      // given
      const user1: User = {
        login: 'user1',
        email: 'user1@user1.com',
        password: 'testPassword123',
        role: Role.ADMIN,
        id: 'userId',
      }
      const req1: UpdateTeamRequest = {
        description: 'description',
        name: 'name',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg/1280px-Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg.png',
      }
      const teamId = 'teamId'

      // when
      jest.spyOn(teamRepository, 'update').mockReturnValueOnce(
        Promise.resolve({
          affected: 1,
          generatedMaps: [],
          raw: null,
        }),
      )

      jest.spyOn(teamRepository, 'findOne').mockReturnValueOnce(
        Promise.resolve({
          id: teamId,
          description: req1.description,
          name: req1.name,
          logo: req1.logo,
          createdAt: undefined,
          createdBy: user1.id,
          updatedAt: undefined,
          updatedBy: user1.id,
        }),
      )

      service
        .updateTeam(teamId, req1, user1)
        .pipe(take(1))
        .subscribe((team: CreateTeamResponse) => {
          expect(team).toEqual({
            id: teamId,
            description: req1.description,
            name: req1.name,
            logo: req1.logo,
            createdAt: undefined,
            createdBy: user1.id,
            updatedAt: undefined,
            updatedBy: user1.id,
          })
        })

      // then
      expect(teamRepository.update).toHaveBeenCalled()
      expect(teamRepository.update).toHaveBeenCalledWith(teamId, {
        description: req1.description,
        logo: req1.logo,
        name: req1.name,
        updatedBy: user1.id,
      })
    })
  })

  describe('delete team', () => {
    it('should call teamRespository.delete with correct params', async () => {
      // given
      const teamId = 'teamId'

      // when
      jest.spyOn(teamRepository, 'delete').mockReturnValueOnce(
        Promise.resolve({
          affected: 1,
          generatedMaps: [],
          raw: null,
        }),
      )

      service
        .deleteTeam(teamId)
        .pipe(take(1))
        .subscribe((deleteResult: DeleteResult) => {
          expect(deleteResult).toEqual({
            affected: 1,
            generatedMaps: [],
            raw: null,
          })
        })

      // then
      expect(teamRepository.delete).toHaveBeenCalled()
      expect(teamRepository.delete).toHaveBeenCalledWith(teamId)
    })
  })
})
