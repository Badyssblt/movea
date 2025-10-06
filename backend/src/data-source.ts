import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Activity } from './activities/entities/activity.entity';
import { ActivityType } from './activity-type/entities/activity-type.entity';
import { User } from './users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'test',
  entities: [Activity, ActivityType, User],
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
});
