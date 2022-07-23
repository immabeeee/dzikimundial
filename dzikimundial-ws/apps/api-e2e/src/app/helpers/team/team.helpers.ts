import * as request from 'supertest'

export function findTeams(httpServer: any, pageNumber: number, pageSize: number, token: string) {
  return request(httpServer)
    .get(`/team/teams?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .set('Authorization', `Bearer ${token}`)
}
