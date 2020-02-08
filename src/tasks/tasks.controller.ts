import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ITask } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}

    @Get('/:id')
    getTaskById(@Param('id') id: string){
        return this.tasksService.getTaskById(id);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): ITask[]{
        if(Object.keys(filterDto).length >0){
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getTasks();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() dto: CreateTaskDto): ITask{
        return this.tasksService.createTask(dto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body('taskStatus', TaskStatusValidationPipe) dto: UpdateTaskStatusDto) : ITask{
        return this.tasksService.updateTaskStatus(id, dto); 
    }

    @Delete('/:id')
    deleteTaskById(@Param("id") id:string){
        return this.tasksService.deleteTaskById(id);
    }
}
