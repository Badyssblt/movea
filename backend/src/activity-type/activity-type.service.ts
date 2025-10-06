import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';

@Injectable()
export class ActivityTypeService {
  constructor(
    @InjectRepository(ActivityType)
    private readonly activityTypeRepository: Repository<ActivityType>,
  ) {}

  // 🟢 CREATE
  async create(createActivityTypeDto: CreateActivityTypeDto): Promise<ActivityType> {
    const activityType = this.activityTypeRepository.create(createActivityTypeDto);
    return this.activityTypeRepository.save(activityType);
  }

  // 🔵 READ - find all
  async findAll(): Promise<ActivityType[]> {
    return this.activityTypeRepository.find({
      order: { name: 'ASC' }, // exemple si tu as un champ name
    });
  }

  // 🔵 READ - find one by id
  async findOne(id: string): Promise<ActivityType> {
    const type = await this.activityTypeRepository.findOneBy({ id });
    if (!type) {
      throw new NotFoundException(`Type d’activité avec id ${id} introuvable`);
    }
    return type;
  }

  // 🟠 UPDATE
  async update(id: string, updateDto: UpdateActivityTypeDto): Promise<ActivityType> {
    const type = await this.findOne(id);
    Object.assign(type, updateDto);
    return this.activityTypeRepository.save(type);
  }

  // 🔴 DELETE
  async remove(id: string): Promise<void> {
    const result = await this.activityTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Type d’activité avec id ${id} introuvable`);
    }
  }
}
