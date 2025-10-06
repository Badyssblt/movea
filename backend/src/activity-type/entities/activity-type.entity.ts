import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Activity } from '../../activities/entities/activity.entity';

@Entity()
export class ActivityType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'json' })
  fields: Record<string, any>[];

  @OneToMany(() => Activity, (activity) => activity.type)
  activities: Activity[];
}
