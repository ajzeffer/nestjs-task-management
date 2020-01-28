import { Injectable } from '@nestjs/common';
import {ITask, TaskStatus} from './task.model';
import { ICreateTaskDto } from './create-task.dto';
import * as uuid from 'uuid/v1';
@Injectable()
export class TasksService {
    private tasks :ITask[]= [ 
        {title :"Task 1 ", id:"1", description: "here is task 1", status: TaskStatus.Open}, 
        {title :"Task 1 ", id:"1", description: "here is task 1", status: TaskStatus.Open}
    ]

    getAllTasks(): ITask[] {
        return this.tasks;
    }

    createTask(createTaskDto: ICreateTaskDto): ITask {
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

}
