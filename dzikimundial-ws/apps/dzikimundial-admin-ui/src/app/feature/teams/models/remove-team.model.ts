export interface TeamForm {
  name: string
  description: string
  logoUrlImage: string
}

export interface RemoveTeam {
  id: string
}

export interface RemoveTeamError extends RemoveTeam {
  error: string
}
