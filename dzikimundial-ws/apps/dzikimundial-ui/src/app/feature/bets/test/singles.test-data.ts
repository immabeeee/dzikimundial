import { TeamName } from '../models/bets-groups/bets-group.model'
import { BetSingle, BetSinglesGroupedByDate } from '../models/bets-single/bets-single.model'
import * as TeamsTestData from './teams.test-data'

export const singlesGroupedByDate: BetSinglesGroupedByDate[] = [
  {
    date: '21/06/2022',
    singles: [
      {
        id: '2a595a58-6fa2-4c55-80a6-00f049e8a962',
        date: new Date(2022, 10, 21, 11, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.SENEGAL),
        awayTeam: TeamsTestData.findTeam(TeamName.NETHERLANDS),
      },
      {
        id: 'ff7c30c0-f567-450d-b7a6-53b7c272ca1e',
        date: new Date(2022, 10, 21, 14, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.ENGLAND),
        awayTeam: TeamsTestData.findTeam(TeamName.IRAN),
      },
      {
        id: '3f16af1c-8af6-4e8b-81c3-96d77882cac0',
        date: new Date(2022, 10, 21, 17, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.QATAR),
        awayTeam: TeamsTestData.findTeam(TeamName.ECUADOR),
      },
      {
        id: '993c1b06-5fa1-4595-8366-54c10a87e48e',
        date: new Date(2022, 10, 21, 20, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.USA),
        awayTeam: TeamsTestData.findTeam(TeamName.WALES),
      },
    ]
  },
  {
    date: '22/11/2022',
    singles: [
      {
        id: 'd572ef1d-4612-4172-8c2b-92efab82858b',
        date: new Date(2022, 10, 22, 11, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.ARGENTINA),
        awayTeam: TeamsTestData.findTeam(TeamName.SAUDI_ARABIA),
      },
      {
        id: 'e65ec1dc-2f31-41fc-9c02-124e25890503',
        date: new Date(2022, 10, 22, 14, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.DENMARK),
        awayTeam: TeamsTestData.findTeam(TeamName.TUNISIA),
      },
      {
        id: '007d0f56-eb41-486c-861e-a2c6f9c09d18',
        date: new Date(2022, 10, 22, 17, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.MEXICO),
        awayTeam: TeamsTestData.findTeam(TeamName.POLAND),
      },
      {
        id: 'd777ff53-a519-4d8a-a3d6-0bd10bf35f38',
        date: new Date(2022, 10, 22, 20, 0, 0, 0),
        homeTeam: TeamsTestData.findTeam(TeamName.FRANCE),
        awayTeam: TeamsTestData.findTeam(TeamName.AUSTRALIA),
      }
    ]
  }
]
export const singles: BetSingle[] = [
  {
    id: '2a595a58-6fa2-4c55-80a6-00f049e8a962',
    date: new Date(2022, 10, 21, 11, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.SENEGAL),
    awayTeam: TeamsTestData.findTeam(TeamName.NETHERLANDS),
  },
  {
    id: 'ff7c30c0-f567-450d-b7a6-53b7c272ca1e',
    date: new Date(2022, 10, 21, 14, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.ENGLAND),
    awayTeam: TeamsTestData.findTeam(TeamName.IRAN),
  },
  {
    id: '3f16af1c-8af6-4e8b-81c3-96d77882cac0',
    date: new Date(2022, 10, 21, 17, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.QATAR),
    awayTeam: TeamsTestData.findTeam(TeamName.ECUADOR),
  },
  {
    id: '993c1b06-5fa1-4595-8366-54c10a87e48e',
    date: new Date(2022, 10, 21, 20, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.USA),
    awayTeam: TeamsTestData.findTeam(TeamName.WALES),
  },
  {
    id: 'd572ef1d-4612-4172-8c2b-92efab82858b',
    date: new Date(2022, 10, 22, 11, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.ARGENTINA),
    awayTeam: TeamsTestData.findTeam(TeamName.SAUDI_ARABIA),
  },
  {
    id: 'e65ec1dc-2f31-41fc-9c02-124e25890503',
    date: new Date(2022, 10, 22, 14, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.DENMARK),
    awayTeam: TeamsTestData.findTeam(TeamName.TUNISIA),
  },
  {
    id: '007d0f56-eb41-486c-861e-a2c6f9c09d18',
    date: new Date(2022, 10, 22, 17, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.MEXICO),
    awayTeam: TeamsTestData.findTeam(TeamName.POLAND),
  },
  {
    id: 'd777ff53-a519-4d8a-a3d6-0bd10bf35f38',
    date: new Date(2022, 10, 22, 20, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.FRANCE),
    awayTeam: TeamsTestData.findTeam(TeamName.AUSTRALIA),
  },
  {
    id: '63532a7e-2e82-4931-9970-81a3cb60180f',
    date: new Date(2022, 10, 23, 11, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.MOROCCO),
    awayTeam: TeamsTestData.findTeam(TeamName.CROATIA),
  },
  {
    id: '65c0da3d-5b17-4ead-a9a6-f41852f78495',
    date: new Date(2022, 10, 23, 14, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.GERMANY),
    awayTeam: TeamsTestData.findTeam(TeamName.JAPAN),
  },
  {
    id: '41532c4e-1898-4539-9a45-500bc831ecbe',
    date: new Date(2022, 10, 23, 17, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.SPAIN),
    awayTeam: TeamsTestData.findTeam(TeamName.COSTA_RICA),
  },
  {
    id: '7b14dae2-a4ab-4498-8bb3-9b9354e3c3d1',
    date: new Date(2022, 10, 23, 20, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.BELGIUM),
    awayTeam: TeamsTestData.findTeam(TeamName.CANADA),
  },
  {
    id: 'c786a91d-4d58-4710-a928-33e4894641cb',
    date: new Date(2022, 10, 24, 11, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.SWITZERLAND),
    awayTeam: TeamsTestData.findTeam(TeamName.CAMEROON),
  },
  {
    id: '8cb707f0-5274-4fb9-a33e-37abe66bcf9d',
    date: new Date(2022, 10, 24, 14, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.URUGUAY),
    awayTeam: TeamsTestData.findTeam(TeamName.SOUTH_KOREA),
  },
  {
    id: 'b89d83ea-c09b-4c31-a1bb-3d1b7c9aa9e2',
    date: new Date(2022, 10, 24, 17, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.PORTUGAL),
    awayTeam: TeamsTestData.findTeam(TeamName.GHANA),
  },
  {
    id: '8b2263e8-65ad-4edd-8933-1b70c9b13dd8',
    date: new Date(2022, 10, 24, 20, 0, 0, 0),
    homeTeam: TeamsTestData.findTeam(TeamName.BRAZIL),
    awayTeam: TeamsTestData.findTeam(TeamName.SERBIA),
  },
]
