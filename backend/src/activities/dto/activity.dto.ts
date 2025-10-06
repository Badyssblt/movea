import { IsUUID, IsInt, IsOptional, IsPositive, Min, IsJSON } from 'class-validator';

export class ActivityDto {
  @IsUUID('4', { message: 'Type d’activité invalide' })
  typeId: string;

  @IsJSON()
  metadata: Record<string, any>;

  @IsOptional()
  date?: Date;
}
