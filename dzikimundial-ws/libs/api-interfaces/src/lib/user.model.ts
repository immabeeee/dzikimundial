export interface User {
  id?: string
  login: string
  email: string
  password: string
  role: Role
}

export interface DecodedToken {
  user: User
  exp: number
  iat: number
}

export interface CreateUserRequest {
  login: string
  email: string
  password: string
  role: Role
}

export interface LoginUserRequest {
  login: string
  password: string
}

export interface LoginUserResponse {
  token: string
}

export type CreatUserResponse = User

export enum Role {
  USER = 'user',
  PREMIUM = 'premium',
  ADMIN = 'admin',
}
