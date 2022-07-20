import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './user.model'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  login: string

  @Column({ unique: true })
  email: string

  @Column({ select: false })
  password: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role
}
