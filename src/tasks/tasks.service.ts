import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {
  private Tasks: Task[] = [];

  GetAllTask() {
    return this.Tasks;
  }

  GetTasksByFilter(filterTaskDto: FilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;

    let tasks = this.GetAllTask();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  GetTaskById(id: string): Task {
    const task = this.Tasks.find((task) => id === task.id);

    if (!task) {
      throw new NotFoundException(`this Id: "${id}" of task not found`);
    }
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
