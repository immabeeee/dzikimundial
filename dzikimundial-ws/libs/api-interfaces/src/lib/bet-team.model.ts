export interface BetGroup {
  id: string
  name: string
  teams: BetGroupTeam[]
}

export interface BetGroupTeam {
    id: string
    name: TeamName
    logo: string
    description: string
    position: number
    groupId: string
    group: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
  }

  export enum TeamName {
    QATAR = 'Qatar ',
    ECUADOR = 'Ecuador ',
    SENEGAL = 'Senegal ',
    NETHERLANDS = 'Netherlands ',
    ENGLAND = 'England ',
    IRAN = 'Iran ',
    USA = 'USA',
    WALES = 'Wales ',
    ARGENTINA = 'Argentina ',
    SAUDI_ARABIA = 'Saudi Arabia ',
    MEXICO = 'Mexico ',
    POLAND = 'Poland ',
    FRANCE = 'France ',
    AUSTRALIA = 'Australia ',
    DENMARK = 'Denmark ',
    TUNISIA = 'Tunisia ',
    SPAIN = 'Spain ',
    COSTA_RICA = 'Costa Rica ',
    GERMANY = 'Germany ',
    JAPAN = 'Japan ',
    BELGIUM = 'Belgium ',
    CANADA = 'Canada',
    MOROCCO = 'Morocco ',
    CROATIA = 'Croatia ',
    BRAZIL = 'Brazil ',
    SERBIA = 'Serbia ',
    SWITZERLAND = 'Switzerland ',
    CAMEROON = 'Cameroon ',
    PORTUGAL = 'Portugal ',
    GHANA = 'Ghana ',
    URUGUAY = 'Uruguay ',
    SOUTH_KOREA = 'South Korea',
  }
  