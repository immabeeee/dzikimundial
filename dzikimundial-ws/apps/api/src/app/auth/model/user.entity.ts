import { Role } from '@dzikimundial-ws/api-interfaces'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  login: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role
}