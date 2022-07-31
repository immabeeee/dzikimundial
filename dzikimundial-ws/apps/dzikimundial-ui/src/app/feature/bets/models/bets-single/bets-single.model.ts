import { BetGroupTeam } from '@dzikimundial-ws/api-interfaces'

export interface BetSingle {
  id: string
  date: Date
  homeTeam: BetGroupTeam
  awayTeam: BetGroupTeam
  homeGoals?: number
  awayGoals?: number
}

export interface BetSinglesGroupedByDate {
  date: string
  singles: BetSingle[]
}

export interface UpdateBetSingleReq {
  id: string
  date: Date
  homeTeam: BetGroupTeam
  awayTeam: BetGroupTeam
  homeGoals: number
  awayGoals: number
}
