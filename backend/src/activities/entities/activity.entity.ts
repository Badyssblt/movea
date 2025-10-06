import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ActivityType } from '../../activity-type/entities/activity-type.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ActivityType, (type) => type.activities, { eager: true })
  @JoinColumn({ name: 'typeId' }) // nom de la colonne en base
  type: ActivityType;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  date: Date;
}
