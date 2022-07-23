export interface User {
    id?: string
    login: string
    email: string
    password: string
    role: Role
  }
  
  export enum Role {
    USER = 'user',
    PREMIUM = 'premium',
    ADMIN = 'admin',
  }
  