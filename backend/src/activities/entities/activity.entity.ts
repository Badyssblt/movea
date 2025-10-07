import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ActivityType } from '../../activity-type/entities/activity-type.entity';
import { Exercise } from '../../exercices/entities/exercices.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.activities, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => ActivityType, (type) => type.activities, { eager: true })
  @JoinColumn({ name: 'typeId' }) // nom de la colonne en base
  type: ActivityType;

  @OneToMany(() => Exercise, (exercise) => exercise.activity, { cascade: true, eager: true })
  exercises: Exercise[];

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  date: Date;
}
