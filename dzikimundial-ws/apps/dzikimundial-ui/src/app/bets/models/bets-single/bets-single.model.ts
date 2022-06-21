import { BetGroupTeam } from '../bets-groups/bets-group.model'

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
