import { CreateTeamRequest, UpdateTeamRequest } from '@dzikimundial-ws/api-interfaces'
import { faker } from '@faker-js/faker'
import * as request from 'supertest'

export function findTeams(httpServer: any, pageNumber: number, pageSize: number, token: string) {
  return request(httpServer)
    .get(`/team/teams?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .set('Authorization', `Bearer ${token}`)
}

export function createTeam(httpServer: any, req: CreateTeamRequest, token: string) {
  return request(httpServer)
    .post(`/team`).send(req)
    .set('Authorization', `Bearer ${token}`)
}

export function updateTeam(httpServer: any, req: UpdateTeamRequest, id: string, token: string) {
  return request(httpServer)
    .put(`/team/${id}`).send(req)
    .set('Authorization', `Bearer ${token}`)
}

export function deleteTeam(httpServer: any, id: string, token: string) {
  return request(httpServer)
    .delete(`/team/${id}`)
    .set('Authorization', `Bearer ${token}`)
}

export function getTeamName(): string {
  return faker.company.companyName()
}

export function getTeamDescription(): string {
  return faker.lorem.sentence()
}

export function getTeamImage(): string {
  return faker.image.sports(400, 400, true)
}