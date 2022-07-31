import { CreateTeamRequest } from '@dzikimundial-ws/api-interfaces'
import { IsString, IsNotEmpty, IsUrl } from 'class-validator'

export class UpdateTeamDto implements CreateTeamRequest {
  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  logo: string
}
