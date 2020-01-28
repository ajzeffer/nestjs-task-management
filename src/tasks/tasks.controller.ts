import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { ICreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get()
    getAllTasks(): ITask[]{
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() dto: ICreateTaskDto): ITask{
        return this.tasksService.createTask(dto);
    }
}
