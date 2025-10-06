import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module'; // ton module Auth
import { ActivityModule } from './activities/activity.module';
import { ConfigModule } from '@nestjs/config';
import { ActivityTypeModule } from './activity-type/activity-type.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/user.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    ActivityModule,
    ActivityTypeModule,
    UsersModule,
    UploadModule
  ],
  controllers: [AppController], // tu n’as plus besoin d’AuthController ici
  providers: [AppService],
})
export class AppModule {}
