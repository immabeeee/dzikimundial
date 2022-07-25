import { Filter, Sort } from './list-query'

export interface Team {
  id?: string
  description: string
  name: string
  logo: string
  createdAt?: Date
  createdBy?: string
  updatedAt?: Date
  updatedBy?: string
}

export interface CreateTeamRequest {
  description: string
  name: string
  logo: string
}

export type UpdateTeamRequest = CreateTeamRequest

export type CreateTeamResponse = Team
export type UpdateTeamResponse = Team
export type GetTeamResponse = Team

export interface GetTeamListResponse {
  teams: Team[]
  pageNumber: number
  pageSize: number
  filters?: Filter[]
  sort?: Sort
}

export interface GetTeamListRequest {
  pageNumber: number
  pageSize: number
  filters?: Filter[]
  sort?: Sort
}
