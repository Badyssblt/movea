import { Activity } from 'src/activities/entities/activity.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Activity, (activity) => activity.user)
  activities: Activity[]

  @Column({ nullable: true })
  profileImage?: string;
}
