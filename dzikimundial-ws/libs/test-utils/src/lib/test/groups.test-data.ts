import { BetGroup } from '@dzikimundial-ws/api-interfaces'
import * as teamsTestData from './teams.test-data';

export const groups: BetGroup[] = [
  {
    id: '0',
    name: 'Group A',
    teams: teamsTestData.teams.filter((team)=>team.group === 'A'),
  },
  {
    id: '1',
    name: 'Group B',
    teams: teamsTestData.teams.filter((team)=>team.group === 'B'),
  },
  {
    id: '2',
    name: 'Group C',
    teams: teamsTestData.teams.filter((team)=>team.group === 'C'),
  },
  {
    id: '3',
    name: 'Group D',
    teams: teamsTestData.teams.filter((team)=>team.group === 'D'),
  },
  {
    id: '4',
    name: 'Group E',
    teams: teamsTestData.teams.filter((team)=>team.group === 'E'),
  },
  {
    id: '5',
    name: 'Group F',
    teams: teamsTestData.teams.filter((team)=>team.group === 'F'),
  },
  {
    id: '6',
    name: 'Group G',
    teams: teamsTestData.teams.filter((team)=>team.group === 'G'),
  },
  {
    id: '7',
    name: 'Group H',
    teams: teamsTestData.teams.filter((team)=>team.group === 'H'),
  },
]
