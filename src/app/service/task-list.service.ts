import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
    
    private readonly domain = 'taskLists';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor( 
        private http: Http, 
        @Inject('BASE_CONFIG') private config
    ){}

    //POST
    add(taskList: TaskList): Observable<TaskList>{
        taskList.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .post(url, JSON.stringify(taskList), {headers: this.headers})
        .map(res => res.json());
    }

    //PUT:将整个taskList都更新一遍
    //patch: 可以值更新指定的某些属性
    update(taskList: TaskList): Observable<TaskList>{
        const url = `${this.config.url}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name
        };
        return this.http
        .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
        .map(res => res.json());
    }

    //DELETE
    //json-server 支持一级级联删除，即删除列表的时候，task也一起删除掉
    del(taskList: TaskList): Observable<TaskList>{
        const url = `${this.config.url}/${this.domain}/${taskList.id}`
        return this.http.delete(url)
                 .mapTo(taskList); 
    }

    //GET
    //取得taskList
    get(projectId: string): Observable<TaskList[]>{
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .get(url, {params: {'projectId': projectId}, headers: this.headers})  //params是筛选的条件，在http://localhost:3000/projects中找project.userId跟我们这里参数userId相同的所有project
        .map(res => res.json() as TaskList[]);
    }

    //列表拖放时，交换顺序，数据更新
    //如果有真实的后端，不需要这么麻烦，直接后端处理就好
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]>{
        const dragUrl = `${this.config.url}/${this.domain}/${src.id}`;
        const dropUrl = `${this.config.url}/${this.domain}/${target.id}`;
        const drag$ = this.http.
            patch(dragUrl, JSON.stringify({order: target.order}), {headers: this.headers} )
            .map( res => res.json());
        const drop$ = this.http.
            patch(dropUrl, JSON.stringify({order: src.order}), { headers: this.headers} )
            .map( res => res.json());
        
        //每拖放一次，TaskList[]就重新排一次
        //concat，merge,都可以，合并类的Rxjs操作符
        return Observable
            .concat(drag$, drop$)
            .reduce((arrs, list) =>[...arrs, list], [] );
    }

}