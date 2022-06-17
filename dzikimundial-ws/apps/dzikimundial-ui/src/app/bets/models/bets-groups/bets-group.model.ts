export interface BetGroup {
  id: string
  name: string
  teams: BetGroupTeam[]
}

export interface BetGroupTeam {
  id: string
  name: string
  logo: string
  description: string
  position: number
}
