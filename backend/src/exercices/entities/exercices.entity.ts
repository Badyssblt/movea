import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Activity } from '../../activities/entities/activity.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Activity, (activity) => activity.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'activityId' })
  activity: Activity;

  @Column()
  name: string; // ex: "Squat"

  @Column({ type: 'int' })
  sets: number;

  @Column({ type: 'int' })
  reps: number;

  @Column({ type: 'float', nullable: true })
  weight?: number; // kg

  @Column({ type: 'float', nullable: true })
  duration?: number; // si exercice basé sur temps plutôt que reps
}
