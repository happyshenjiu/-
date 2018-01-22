export interface TaskList{
    id?: string;
    name: string;
    order: number;
    taskIds: string[];  //存task的ID
    projectId: string;  // 任何一个任务列表都属于一个项目，这里保存该项目的ID
}