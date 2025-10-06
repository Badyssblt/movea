import { Repository } from "typeorm";
import { Activity } from "./entities/activity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ActivityDto } from "./dto/activity.dto";
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  // CREATE
  async createActivity(dto: ActivityDto, userId: string) {
    const activity = this.activityRepository.create({
      user: { id: userId },              // on peut aussi juste passer l'ID
      type: { id: dto.typeId },
      metadata: dto.metadata,
      date: dto.date,
    });
  
    return this.activityRepository.save(activity);
  }

  // READ (par user)
  async findActivitiesByUser(userId: string) {
    return this.activityRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      relations: ['user'],
    });
  }

  // READ (par id)
  async findOneById(id: string, userId: string) {
    const activity = await this.activityRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'],
    });
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  // UPDATE
  async updateActivity(id: string, dto: Partial<ActivityDto>, userId: string) {
    const activity = await this.findOneById(id, userId);
    if (!activity) throw new NotFoundException('Activity not found');

    Object.assign(activity, dto); // merge les changements
    return this.activityRepository.save(activity);
  }

  // DELETE
  async deleteActivity(id: string, userId: string) {
    const activity = await this.findOneById(id, userId);
    if (!activity) throw new NotFoundException('Activity not found');

    await this.activityRepository.remove(activity);
    return { message: 'Activity deleted successfully' };
  }
}
