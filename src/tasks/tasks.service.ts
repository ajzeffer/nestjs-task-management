import { Injectable, NotFoundException } from '@nestjs/common';
import {ITask, TaskStatus} from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import * as uuid from 'uuid/v1';
import { UpdateTaskStatusDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks :ITask[]= [ 
      
    ]

    getTaskById(id: string): ITask{
        var found =  this.tasks.find(task => task.id === id);
        
        if(!found){
            throw new NotFoundException(`Task with ${id} not found :-/`);
        }
        return found; 
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): ITask[]{
        const {status, search} = filterDto;
        let tasks = this.getTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }
        return tasks;
    }

    getTasks(): ITask[] {
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
        var found = this.getTaskById(id); 
        this.tasks = this.tasks.filter(task => task.id != found.id);
        return true; 
    }

    updateTaskStatus(id:string, dto: UpdateTaskStatusDto): ITask{
        const task = this.getTaskById(id);
        task.status = dto.taskStatus;
        return task;
    }

}
