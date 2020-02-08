import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [
        TaskStatus.Open, 
        TaskStatus.IN_PROGRESS, 
        TaskStatus.DONE, 
    ]
    
    transform(value: string, metadata: ArgumentMetadata){
        console.log('value', value); 
        value = value.toUpperCase();
        if(!this.isStatusAllowed(value)){
            throw new BadRequestException(`${value} is an invalid status, please pass one of the following (${this.allowedStatuses})`)
        }
        return value; 
    }

    private isStatusAllowed(status: any): boolean{
        const idx = this.allowedStatuses.indexOf(status); 
        return idx !== -1
    }
}