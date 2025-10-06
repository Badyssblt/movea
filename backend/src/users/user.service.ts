import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 🔹 Créer un utilisateur
  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  // 🔹 Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // 🔹 Récupérer un utilisateur par ID
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable`);
    return user;
  }

  async updateUserAvatar(id: string, filename: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('Utilisateur introuvable');
    user.profileImage = filename;
    return this.userRepository.save(user);
  }

  // 🔹 Récupérer un utilisateur par email (utile pour Auth)
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  // 🔹 Mettre à jour un utilisateur
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  // 🔹 Supprimer un utilisateur
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
