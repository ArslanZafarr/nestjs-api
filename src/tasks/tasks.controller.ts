import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  GetTasks(@Query() filterTaskDto: FilterTaskDto) {
    if (Object.keys(filterTaskDto).length) {
      return this.tasksService.GetTasksByFilter(filterTaskDto);
    } else {
      return this.tasksService.GetAllTask();
    }
  }

  @Post()
  CreateTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.CreateTask(createTaskDto);
  }

  @Get('/:id')
  GetTaskById(@Param('id') id: string): Task {
    return this.tasksService.GetTaskById(id);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') id: string): void {
    this.tasksService.DeleteTask(id);
  }

  @Patch('/:id/status')
  UpdateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    return this.tasksService.UpdateTask(id, updateTaskStatusDto);
  }
}
