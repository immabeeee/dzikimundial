import { Injectable } from '@angular/core'
import { BetGroupTeam } from '../../models/bets-groups/bets-group.model'

@Injectable()
export class BetsGroupTeamsService {
  public changeTeamPosition(
    previousTeams: BetGroupTeam[],
    currentTeams: BetGroupTeam[],
    previousIndex: number,
    currentIndex: number,
  ): BetGroupTeam[] {
    const changedTeam: BetGroupTeam | undefined = previousTeams.find((team) => team.position === previousIndex)
    const changedSecondTeam: BetGroupTeam | undefined = previousTeams.find((team) => team.position === currentIndex)

    return currentTeams.map((team: BetGroupTeam) => {
      if (team.id === changedTeam?.id) {
        return { ...team, position: currentIndex }
      } else if (team.id === changedSecondTeam?.id) {
        return { ...team, position: previousIndex }
      }
      return team
    })
  }
}
