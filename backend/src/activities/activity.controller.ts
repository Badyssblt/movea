import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards } from "@nestjs/common";
import { ActivityService } from "./activity.service";
import { ActivityDto } from "./dto/activity.dto";
import { Activity } from "./entities/activity.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from '../common/decorators/user.decorator';

@Controller('activity')
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService
  ) {}

  // ✅ CREATE
  @UseGuards(AuthGuard)
  @Post('create')
  async createActivity(
    @Body() dto: ActivityDto,
    @User('id') userId: string
  ): Promise<Activity> {
    console.log(dto);
    
    return this.activityService.createActivity(dto, userId);
  }

  // ✅ READ (les activités de l'utilisateur connecté)
  @UseGuards(AuthGuard)
  @Get('me')
  async getMyActivities(@User('id') userId: string) {
    return this.activityService.findActivitiesByUser(userId);
  }

  // ✅ READ (une activité par id)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getActivityById(
    @Param('id') id: string,
    @User('id') userId: string
  ) {
    return this.activityService.findOneById(id, userId);
  }

  // ✅ UPDATE
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() dto: Partial<ActivityDto>,
    @User('id') userId: string
  ) {
    return this.activityService.updateActivity(id, dto, userId);
  }

  // ✅ DELETE
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteActivity(
    @Param('id') id: string,
    @User('id') userId: string
  ) {
    return this.activityService.deleteActivity(id, userId);
  }
}
