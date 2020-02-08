export interface ITask {
    id:string; 
    title: string; 
    description: string; 
    status: TaskStatus
}

export enum TaskStatus{
    Open = 'OPEN', 
    IN_PROGRESS = 'IN_PROGRESS', 
    DONE = 'DONE'

}