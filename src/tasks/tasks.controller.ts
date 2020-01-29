import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskDto } from './dto/delete-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get('/:id')
    getTaskById(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Get()
    getAllTasks(): ITask[]{
        return this.tasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() dto: CreateTaskDto): ITask{
        return this.tasksService.createTask(dto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body() dto: UpdateTaskStatusDto) : ITask{
        return this.tasksService.updateTaskStatus(id, dto); 
    }

    @Delete('/:id')
    deleteTaskById(@Param("id") id:string){
        return this.tasksService.deleteTaskById(id);
    }
}
