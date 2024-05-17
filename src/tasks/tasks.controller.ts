import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetAllTask() {
    return this.tasksService.GetAllTask();
  }

  @Post()
  CreateTask(@Body() title: string, @Body() description: string): Task {
    return this.tasksService.CreateTask(title, description);
  }
}
