import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];

  GetAllTask() {
    return this.Tasks;
  }

  CreateTask(title: string, description: string): Task {
    const task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.Tasks.push(task);
    return task;
  }
}
