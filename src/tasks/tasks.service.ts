import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task.model';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: FilterTaskDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      throw new Error('Failed to get tasks');
    }
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    task.userId = user.id;

    await this.taskRepository.save(task);

    delete task.user;

    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const task = await this.getTaskById(id, user);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    await this.taskRepository.remove(task);
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
