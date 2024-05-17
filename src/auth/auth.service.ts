import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //  register user
  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  //  Get All User
  findAll() {
    return `This action returns all auth`;
  }

  // Get Single User
  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // Update User Profile
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  // Delete User
  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
