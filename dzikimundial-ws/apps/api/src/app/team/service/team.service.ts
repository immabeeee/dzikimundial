import { Injectable } from '@nestjs/common'
import { from, map, Observable, switchMap, tap } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Like, Repository } from 'typeorm'
import {
  CreateTeamResponse,
  GetTeamListRequest,
  GetTeamListResponse,
  GetTeamResponse,
  Team,
  UpdateTeamResponse,
  User,
} from '@dzikimundial-ws/api-interfaces'
import { TeamEntity } from '../model/team.entity'
import { CreateTeamDto } from '../model/dto/create-team.dto.model'
import { UpdateTeamDto } from '../model/dto/update-team.dto.model'

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  createTeam(req: CreateTeamDto, user: User): Observable<CreateTeamResponse> {
    const team: Team = {
      ...req,
      createdBy: user.id,
      updatedBy: user.id,
    }
    return from(this.teamRepository.save(team))
  }

  updateTeam(id: string, req: UpdateTeamDto, user: User): Observable<UpdateTeamResponse> {
    const team: Team = {
      ...req,
      updatedBy: user.id,
    }

    return from(this.teamRepository.update(id, team)).pipe(
      switchMap(() => {
        return from(
          this.teamRepository.findOne({
            where: [{ id: id }],
            select: ['id', 'createdAt', 'createdBy', 'updatedBy', 'updatedAt', 'name', 'description', 'logo'],
          }),
        )
      }),
    )
  }

  deleteTeam(id: string): Observable<DeleteResult> {
    return from(this.teamRepository.delete(id))
  }

  findTeams(req: GetTeamListRequest): Observable<GetTeamListResponse> {
    const { pageNumber, pageSize, filters, sort } = req
    const skip = pageNumber * pageSize

    const whereQuery =
      filters &&
      filters.length > 0 &&
      filters.map((filter) => {
        return {
          [`${filter.name}`]: Like(`%${filter.value}%`),
        }
      })

    const orderQuery = sort && sort.orderBy && sort.sortBy ? { [`${sort.orderBy}`]: sort.sortBy } : {}

    return from(
      this.teamRepository.find({
        where: whereQuery,
        order: orderQuery,
        take: pageSize,
        skip: skip,
      }),
    ).pipe(
      map((teams: Team[]) => {
        return {
          teams,
          pageNumber,
          pageSize,
          filters,
          sort,
        }
      }),
    )
  }

  findTeam(id: string): Observable<GetTeamResponse> {
    return from(
      this.teamRepository.findOne({
        where: [{ id: id }],
        select: ['id', 'createdAt', 'createdBy', 'updatedBy', 'updatedAt', 'name', 'description', 'logo'],
      }),
    )
  }
}
