import * as request from 'supertest'
import { faker } from '@faker-js/faker'
import { User } from '@dzikimundial-ws/api-interfaces'
import { from, Observable, tap } from 'rxjs'

export const TEST_ADMIN_LOGIN = 'test_admin'
export const TEST_ADMIN_PASSWORD = 'password'

export function createUser(httpServer: any, user: User) {
  return request(httpServer).post('/auth/register').send({
    login: user.login,
    email: user.email,
    password: user.password,
    role: user.role,
  })
}

export function loginUser(httpServer: any, login: string, password: string) {
  return request(httpServer).post('/auth/login').send({
    login,
    password,
  })
}

export async function getTokenForTestAdmin(httpServer: any): Promise<string> {
  let token: string

  await loginUser(httpServer, TEST_ADMIN_LOGIN, TEST_ADMIN_PASSWORD).then(({ body }) => (token = body.token))

  return token
}

export function deleteUser(httpServer: any, id: string) {
  return request(httpServer).delete(`/auth/${id}`)
}

export function getLogin(): string {
  return faker.internet.userName()
}

export function getEmail(): string {
  return faker.internet.email()
}

export function getPassword(): string {
  return faker.internet.password()
}
