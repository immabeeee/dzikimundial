import {
  CreateTeamRequest,
  CreateTeamResponse,
  GetTeamListResponse,
  Role,
  UpdateTeamRequest,
  UpdateTeamResponse,
} from '@dzikimundial-ws/api-interfaces'
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common'
import { Observable } from 'rxjs'
import { DeleteResult } from 'typeorm'
import { Roles } from '../../auth/decorator/roles.decorator'
import { JwtGuard } from '../../auth/guard/jwt.guard'
import { RolesGuard } from '../../auth/guard/roles.guard'
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
  create(@Body() body: CreateTeamRequest, @Request() req: any): Observable<CreateTeamResponse> {
    this.loggerService.log(`${this.apiName} - create team with data: ${JSON.stringify(body)}`)
    return this.teamService.createTeam(body, req.user)
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  update(@Param() id: string, @Body() body: UpdateTeamRequest, @Request() req: any): Observable<UpdateTeamResponse> {
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
  @Get('teams')
  find(@Query('pageNumber') pageNumber = 0, @Query('pageSize') pageSize = 100): Observable<GetTeamListResponse> {
    this.loggerService.log(
      `${this.apiName} - get teams for selected criterias: pageNumber: ${pageNumber}, pageSize: ${pageSize}`,
    )
    return this.teamService.findTeams(pageNumber, pageSize)
  }
}
