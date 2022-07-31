export interface Message {
  message: string
}

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface DeleteResult {
  raw: any
  affected?: number | null
}
