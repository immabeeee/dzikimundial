import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm'

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column({unique: false})
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({unique: false})
  updatedBy: string;

  @Column({ unique: false })
  name: string

  @Column({ unique: false })
  description: string

  @Column({ unique: false })
  logo: string
}
