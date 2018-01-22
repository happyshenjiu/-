export interface Task{
    id?: string;
    desc: string;
    completed: boolean;  //是否完成
    priority: number;  // 优先级
    dueDate?: Date;  //截止日期
    reminder?: Date;  //提醒日期
    remark?: string;  //备注
    createDate: Date;
    ownerId?: string;  //存所有者的id
    participantIds?: string[];  //参与者
    taskListId: string; //每一个任务都从属于一个任务列表
}