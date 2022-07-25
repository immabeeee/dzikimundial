/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from './../../../api/src/app/app.module'
import {
  getTokenForTestAdmin,
  getTokenForTestUserPremium,
  getTokenForTestUser,
  getDecodedToken,
} from './helpers/auth/user.helpers'
import {
  findTeams,
  createTeam,
  deleteTeam,
  getTeamName,
  getTeamDescription,
  getTeamImage,
  updateTeam,
} from './helpers/team/team.helpers'
import {
  CreateTeamRequest,
  CreateTeamResponse,
  GetTeamListResponse,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { DeleteResult } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

describe('Team API (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  describe('team list', () => {
    it('return team list for authenticated user', async () => {
      // given
      const pageNumber = 0
      const pageSize = 0
      const tokenAdminTest = await getTokenForTestAdmin(app.getHttpServer())

      // when
      return (
        findTeams(app.getHttpServer(), pageNumber, pageSize, tokenAdminTest)
          // then
          .expect(200)
          .expect(({ body }: { body: GetTeamListResponse }) => {
            expect(body.teams).toBeDefined()
            expect(body.pageNumber).toEqual(pageNumber.toString())
            expect(body.pageSize).toEqual(pageSize.toString())
          })
      )
    })

    it('throw error for unauthenticated user', async () => {
      // given
      const pageNumber = 0
      const pageSize = 0

      // when
      return (
        findTeams(app.getHttpServer(), pageNumber, pageSize, null)
          // then
          .expect(401)
          .expect(({ body }) => {
            expect(body.statusCode).toEqual(401)
            expect(body.message).toEqual('Unauthorized')
          })
      )
    })

    it('throw error for user without admin\n premissions', async () => {
      // given
      const pageNumber = 0
      const pageSize = 0
      const tokenUserTest = await getTokenForTestUser(app.getHttpServer())

      // when
      return (
        findTeams(app.getHttpServer(), pageNumber, pageSize, tokenUserTest)
          // then
          .expect(401)
          .expect(({ body }) => {
            expect(body.statusCode).toEqual(401)
            expect(body.message).toEqual('Unauthorized')
          })
      )
    })

    it('throw error for premium user without admin\n premissions', async () => {
      // given
      const pageNumber = 0
      const pageSize = 0
      const tokenUserPremiumTest = await getTokenForTestUserPremium(app.getHttpServer())

      // when
      return (
        findTeams(app.getHttpServer(), pageNumber, pageSize, tokenUserPremiumTest)
          // then
          .expect(401)
          .expect(({ body }) => {
            expect(body.statusCode).toEqual(401)
            expect(body.message).toEqual('Unauthorized')
          })
      )
    })
  })

  describe('create a new team', () => {
    it('should create a new team', async () => {
      // given
      const tokenAdminTest = await getTokenForTestAdmin(app.getHttpServer())
      const { user } = getDecodedToken(tokenAdminTest)
      const req: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      // when
      return (
        createTeam(app.getHttpServer(), req, tokenAdminTest)
          .expect(201)
          .expect(({ body }: { body: CreateTeamResponse }) => {
            expect(body.logo).toEqual(req.logo)
            expect(body.name).toEqual(req.name)
            expect(body.description).toEqual(req.description)
            expect(body.id).toBeDefined()
            expect(body.createdAt).toBeDefined()
            expect(body.createdBy).toEqual(user.id)
            expect(body.updatedAt).toBeDefined()
            expect(body.updatedBy).toEqual(user.id)
          })
          // remove created data
          .then(({ body }: { body: CreateTeamResponse }) => deleteTeam(app.getHttpServer(), body.id, tokenAdminTest))
      )
    })

    it('shouldnt create a new team and throw error when provided data isnt valid', async () => {
      // given
      const tokenAdminTest = await getTokenForTestAdmin(app.getHttpServer())
      const req: CreateTeamRequest = {
        name: null,
        description: null,
        logo: null,
      }
      // when
      return createTeam(app.getHttpServer(), req, tokenAdminTest)
        .expect(400)
        .expect(({ body }: { body: { statusCode: number; message: string[]; error: string } }) => {
          expect(body.statusCode).toEqual(400)
          expect(body.message.length).toEqual(7)
          expect(body.message).toEqual([
            'description must be a string',
            'description should not be empty',
            'name must be a string',
            'name should not be empty',
            'logo must be an URL address',
            'logo must be a string',
            'logo should not be empty',
          ])
          expect(body.error).toEqual('Bad Request')
        })
    })

    it('shouldnt create a new team and throw error for user without admin\n premissions', async () => {
      // given
      const token = await getTokenForTestUser(app.getHttpServer())
      const req: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      // when
      return createTeam(app.getHttpServer(), req, token)
        .expect(401)
        .expect(({ body }) => {
          expect(body.statusCode).toEqual(401)
          expect(body.message).toEqual('Unauthorized')
        })
    })

    it('shouldnt create a new team and throw error for premium user without admin\n premissions', async () => {
      // given
      const token = await getTokenForTestUserPremium(app.getHttpServer())
      const req: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      // when
      return createTeam(app.getHttpServer(), req, token)
        .expect(401)
        .expect(({ body }) => {
          expect(body.statusCode).toEqual(401)
          expect(body.message).toEqual('Unauthorized')
        })
    })
  })

  describe('update provided team', () => {
    it('update provided team', async () => {
      // given
      const token = await getTokenForTestAdmin(app.getHttpServer())
      const { user } = getDecodedToken(token)
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      const updateTeamRequest: CreateTeamRequest = {
        name: createTeamRequest.name,
        description: getTeamDescription(),
        logo: createTeamRequest.logo,
      }
      let createdAt: Date
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, token)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            createdAt = body.createdAt
            teamId = body.id
            return updateTeam(app.getHttpServer(), updateTeamRequest, body.id, token)
              .expect(200)
              .expect(({ body }: { body: UpdateTeamResponse }) => {
                expect(body.logo).toEqual(updateTeamRequest.logo)
                expect(body.name).toEqual(updateTeamRequest.name)
                expect(body.description).toEqual(updateTeamRequest.description)
                expect(body.id).toEqual(body.id)
                expect(body.createdAt).toEqual(createdAt)
                expect(body.createdBy).toEqual(user.id)
                expect(body.updatedAt).toBeDefined()
                expect(body.updatedAt).not.toEqual(createdAt)
                expect(body.updatedBy).toEqual(user.id)
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, token).expect(200))
      )
    })

    it('shouldnt update a team and throw error when provided data isnt valid', async () => {
      // given
      const token = await getTokenForTestAdmin(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      const updateTeamRequest: CreateTeamRequest = {
        name: null,
        description: null,
        logo: null,
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, token)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return updateTeam(app.getHttpServer(), updateTeamRequest, body.id, token)
              .expect(400)
              .expect(({ body }: { body: { statusCode: number; message: string[]; error: string } }) => {
                expect(body.statusCode).toEqual(400)
                expect(body.message.length).toEqual(7)
                expect(body.message).toEqual([
                  'description must be a string',
                  'description should not be empty',
                  'name must be a string',
                  'name should not be empty',
                  'logo must be an URL address',
                  'logo must be a string',
                  'logo should not be empty',
                ])
                expect(body.error).toEqual('Bad Request')
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, token).expect(200))
      )
    })

    it('shouldnt update a team and throw error when PREMIUM user has not admin permissions', async () => {
      // given
      const adminToken = await getTokenForTestAdmin(app.getHttpServer())
      const premiumUsertoken = await getTokenForTestUserPremium(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      const updateTeamRequest: CreateTeamRequest = {
        ...createTeamRequest,
        description: getTeamDescription(),
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, adminToken)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return updateTeam(app.getHttpServer(), updateTeamRequest, body.id, premiumUsertoken)
              .expect(401)
              .expect(({ body }: { body: { statusCode: number; message: string } }) => {
                expect(body.statusCode).toEqual(401)
                expect(body.message).toEqual('Unauthorized')
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, adminToken).expect(200))
      )
    })

    it('shouldnt update a team and throw error when user has not admin permissions', async () => {
      // given
      const adminToken = await getTokenForTestAdmin(app.getHttpServer())
      const userToken = await getTokenForTestUser(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      const updateTeamRequest: CreateTeamRequest = {
        ...createTeamRequest,
        description: getTeamDescription(),
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, adminToken)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return updateTeam(app.getHttpServer(), updateTeamRequest, body.id, userToken)
              .expect(401)
              .expect(({ body }: { body: { statusCode: number; message: string } }) => {
                expect(body.statusCode).toEqual(401)
                expect(body.message).toEqual('Unauthorized')
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, adminToken).expect(200))
      )
    })
  })

  describe('delete provided team', () => {
    it('delete provided team', async () => {
      // given
      const token = await getTokenForTestAdmin(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, token)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            return deleteTeam(app.getHttpServer(), body.id, token)
              .expect(200)
              .expect(({ body }: { body: DeleteResult }) => {
                expect(body.affected).toEqual(1)
              })
          })
      )
    })

    it('shouldnt delete a team when entity doenst exist', async () => {
      // given
      const adminToken = await getTokenForTestAdmin(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, adminToken)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return deleteTeam(app.getHttpServer(), uuidv4(), adminToken)
              .expect(200)
              .expect(({ body }: { body: DeleteResult }) => {
                expect(body.affected).toEqual(0)
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, adminToken).expect(200))
      )
    })

    it('shouldnt delete a team and throw error when PREMIUM user has not admin permissions', async () => {
      // given
      const adminToken = await getTokenForTestAdmin(app.getHttpServer())
      const premiumUsertoken = await getTokenForTestUserPremium(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, adminToken)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return deleteTeam(app.getHttpServer(), body.id, premiumUsertoken)
              .expect(401)
              .expect(({ body }: { body: { statusCode: number; message: string } }) => {
                expect(body.statusCode).toEqual(401)
                expect(body.message).toEqual('Unauthorized')
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, adminToken).expect(200))
      )
    })

    it('shouldnt delete a team and throw error when user has not admin permissions', async () => {
      // given
      const adminToken = await getTokenForTestAdmin(app.getHttpServer())
      const userToken = await getTokenForTestUser(app.getHttpServer())
      const createTeamRequest: CreateTeamRequest = {
        name: getTeamName(),
        description: getTeamDescription(),
        logo: getTeamImage(),
      }
      let teamId: string

      // when
      return (
        createTeam(app.getHttpServer(), createTeamRequest, adminToken)
          // then
          .expect(201)
          .then(({ body }: { body: CreateTeamResponse }) => {
            teamId = body.id
            return deleteTeam(app.getHttpServer(), body.id, userToken)
              .expect(401)
              .expect(({ body }: { body: { statusCode: number; message: string } }) => {
                expect(body.statusCode).toEqual(401)
                expect(body.message).toEqual('Unauthorized')
              })
          })
          // remove created data
          .then(() => deleteTeam(app.getHttpServer(), teamId, adminToken).expect(200))
      )
    })
  })
})
