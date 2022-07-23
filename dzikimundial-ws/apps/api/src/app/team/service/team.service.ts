import { Injectable } from '@nestjs/common'
import { from, map, Observable, switchMap } from 'rxjs'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { CreateTeamRequest, CreateTeamResponse, GetTeamListResponse, Team, UpdateTeamRequest, UpdateTeamResponse, User } from '@dzikimundial-ws/api-interfaces'
import { TeamEntity } from '../model/team.entity'

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  createTeam(req: CreateTeamRequest, user: User): Observable<CreateTeamResponse> {
    const team: Team = {
      ...req,
      createdBy: user.id,
      updatedBy: user.id,
    }
    return from(this.teamRepository.save(team));
  }

  updateTeam(id: string, req: UpdateTeamRequest, user: User): Observable<UpdateTeamResponse> {
    const team: Team = {
      ...req,
      updatedBy: user.id,
    }

    return from(this.teamRepository.update(id, team)).pipe(
      switchMap(()=>{
        return from(this.teamRepository.findOne({
          where: [{ id: id }],
          select: ['id', 'createdAt', 'createdBy', 'updatedBy', 'updatedAt', 'name', 'description', 'logo'],
        }))
      })
    )
  }

  deleteTeam(id: string): Observable<DeleteResult> {
    return from(this.teamRepository.delete(id));
  }

  findTeams(pageNumber: number, pageSize: number): Observable<GetTeamListResponse>{
    const skip = pageNumber * pageSize;
    return from(
              this.teamRepository
                .createQueryBuilder('team')
                .take(pageSize)
                .skip(skip)
                .getMany()
            ).pipe(
              map((teams: Team[]) => {
                return {
                  teams,
                  pageNumber,
                  pageSize
                };
              })
            );
  }
}