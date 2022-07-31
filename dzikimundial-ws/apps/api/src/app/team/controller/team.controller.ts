import {
  CreateTeamResponse,
  GetTeamListRequest,
  GetTeamListResponse,
  GetTeamResponse,
  Role,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { Observable } from 'rxjs'
import { DeleteResult } from 'typeorm'
import { Roles } from '../../auth/decorator/roles.decorator'
import { JwtGuard } from '../../auth/guard/jwt.guard'
import { RolesGuard } from '../../auth/guard/roles.guard'
import { CreateTeamDto } from '../model/dto/create-team.dto.model'
import { UpdateTeamDto } from '../model/dto/update-team.dto.model'
import { TEAM_SERVICE } from '../model/token'
import { TeamService } from '../service/team.service'
import { LoggerService } from './../../shared/logger/service/logger.service'

@Controller('team')
export class TeamController {
  private readonly apiName = '[TEAM API]'

  constructor(@Inject(TEAM_SERVICE) private readonly teamService: TeamService, private loggerService: LoggerService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('')
  create(@Body() body: CreateTeamDto, @Request() req: any): Observable<CreateTeamResponse> {
    this.loggerService.log(`${this.apiName} - create team with data: ${JSON.stringify(body)}`)
    return this.teamService.createTeam(body, req.user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTeamDto, @Request() req: any): Observable<UpdateTeamResponse> {
    this.loggerService.log(`${this.apiName} - update team: ${id} with data: ${JSON.stringify(body)}`)
    return this.teamService.updateTeam(id, body, req.user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete(':id')
  delete(@Param() id: string): Observable<DeleteResult> {
    this.loggerService.log(`${this.apiName} - delete team with id ${id}`)
    return this.teamService.deleteTeam(id)
  }

  @UseGuards(JwtGuard)
  @Post('teams')
  find(@Body() body: GetTeamListRequest): Observable<GetTeamListResponse> {
    this.loggerService.log(
      `${this.apiName} - get teams for selected criterias: pageNumber: ${body.pageNumber}, pageSize: ${
        body.pageSize
      }, filters: ${JSON.stringify(body.filters)}, sort: ${JSON.stringify(body.sort)}`,
    )
    return this.teamService.findTeams(body)
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findTeam(@Param() id: any): Observable<GetTeamResponse> {
    this.loggerService.log(`${this.apiName} - get team details for id: ${id.id}`)
    return this.teamService.findTeam(id.id)
  }
}
