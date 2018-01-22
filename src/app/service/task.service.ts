import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Task, TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskService {
    
    private readonly domain = 'tasks';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor( 
        private http: Http, 
        @Inject('BASE_CONFIG') private config
    ){}

    //POST
    add(task: Task): Observable<Task>{
        task.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .post(url, JSON.stringify(task), {headers: this.headers})
        .map(res => res.json());
    }

    //PUT:将整个taskList都更新一遍
    //patch: 可以值更新指定的某些属性
    update(task: Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc: task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark
        };
        return this.http
        .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
        .map(res => res.json());
    }

    //DELETE
    //json-server 支持一级级联删除，即删除列表的时候，task也一起删除掉
    del(task: Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`
        return this.http.delete(url)
                 .mapTo(task); 
    }

    //GET
    //取得taskList
    get(taskListId: string): Observable<Task[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .get(url, {params: {'taskListId': taskListId}, headers: this.headers})  //params是筛选的条件，在http://localhost:3000/projects中找project.userId跟我们这里参数userId相同的所有project
        .map(res => res.json() as Task[]);
    }

    //当打开一个project的时候，获取任务数组
    getByLists(lists: TaskList[]): Observable<Task[]>{
        return Observable.from(lists)
        .mergeMap(list => this.get(list.id))
        //若干个数组合并成一个新的数组
        .reduce( (tasks: Task[], t: Task[]) => [...tasks, ...t], [] )
    }

    //完成任务
    complete(task: Task): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${task.id}`;
        return this.http
            .patch(url, JSON.stringify({complete: !task.completed}), {headers: this.headers})
            .map(res => res.json());
    }

    //移动
    move(taskId: string, taskListId: string): Observable<Task>{
        const url = `${this.config.url}/${this.domain}/${taskId}`;
        return this.http
            .patch(url, JSON.stringify({taskListId: taskListId}), {headers: this.headers})
            .map(res => res.json());
    }

    //移动
    moveAll(srcListId: string, targetListId: string): Observable<Task[]>{
        return this.get(srcListId)  //得到的是一个task[]数组
        .mergeMap( tasks => Observable.from(tasks))  //把task[]数组变成一个个task的流
        .mergeMap( task => this.move(task.id, targetListId) )  //把每一个task移到另一个列表中去
        .reduce( (arr, x) => [...arr, x],[]) // 最后把这些返回的值组成一个数组
    }

    
}