import { TaskStatus } from "../task.model";
import { IsNotEmpty, IsOptional, IsIn } from "class-validator";
import { TaskStatusValidationPipe } from "../pipes/task-status-validation.pipe";

export class GetTasksFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.Open,TaskStatus.DONE,TaskStatus.IN_PROGRESS, ])
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}