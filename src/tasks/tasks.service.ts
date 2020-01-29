import { Injectable } from '@nestjs/common';
import {ITask, TaskStatus} from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import * as uuid from 'uuid/v1';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
@Injectable()
export class TasksService {
    private tasks :ITask[]= [ 
      
    ]

    getTaskById(id: string): ITask{
        return this.tasks.find(task => task.id === id);
    }

    getAllTasks(): ITask[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): ITask {
        console.log(createTaskDto);
        const task: ITask = {
            id:uuid(), 
            title: createTaskDto.title, 
            description: createTaskDto.description, 
            status: TaskStatus.Open
        }; 
        this.tasks.push(task); 
        return task;
    }

    deleteTaskById(id:string): boolean{
        this.tasks = this.tasks.filter(task => task.id != id);
        return true; 
    }

    updateTaskStatus(id:string, dto: UpdateTaskStatusDto): ITask{
        const task = this.getTaskById(id);
        task.status = dto.taskStatus;
        return task;
    }

}
