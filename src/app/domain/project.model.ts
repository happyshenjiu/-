export interface Project{
    id?: string;
    name: string;
    desc?: string;
    coverImg: string;
    taskLists?: string[]; //存的是列表的ID
    menbers: string[]; //村的是成员的ID
}