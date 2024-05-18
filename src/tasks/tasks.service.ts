import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];

  GetAllTask() {
    return this.Tasks;
  }

  GetTaskById(id: string): Task {
    const task = this.Tasks.find((task) => id === task.id);
    return task;
  }

  CreateTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.Tasks.push(task);
    return task;
  }

  DeleteTask(id: string): void {
    const found = this.GetTaskById(id);
    this.Tasks = this.Tasks.filter((task) => task.id !== found.id);
  }

  UpdateTask(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    const task = this.GetTaskById(id);
    if (!updateTaskStatusDto || !updateTaskStatusDto.status) {
      throw new NotFoundException(
        `Task with ID "${id}" not found or invalid status`,
      );
    }
    task.status = updateTaskStatusDto.status;
    return task;
  }
}
