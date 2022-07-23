import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from './../../../api/src/app/app.module'
import { getTokenForTestAdmin } from './helpers/auth/user.helpers'
import { findTeams } from './helpers/team/team.helpers'
import { GetTeamListResponse } from '@dzikimundial-ws/api-interfaces'

describe('Team API (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('team list', () => {
    it('return team list for authenticated user', async () => {
      // given
      const pageNumber = 0
      const pageSize = 0
      const token: string = await getTokenForTestAdmin(app.getHttpServer())

      // when
      return (
        findTeams(app.getHttpServer(), pageNumber, pageSize, token)
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
  })
})
