import { Filter, Sort } from '@dzikimundial-ws/api-interfaces'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class GetTeamListDto {
  @IsNotEmpty()
  @IsNumber()
  pageNumber: number

  @IsNotEmpty()
  @IsNumber()
  pageSize: number

  @IsOptional()
  filters: Filter[]

  @IsOptional()
  sort: Sort
}
