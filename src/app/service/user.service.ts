import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    
    private readonly domain = 'users';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor( 
        private http: Http, 
        @Inject('BASE_CONFIG') private config
    ){}

   searchUsers(filter: string): Observable<User[]>{
    const url = `${this.config.url}/${this.domain}`;
    return this.http
    .get(url, {params: {'email_like': filter}, headers: this.headers}) 
    .map(res => res.json() as User[]);
   }

   //获得项目成员
   getUsersByProject(projectId: string): Observable<User[]>{
    const url = `${this.config.url}/${this.domain}`;
    return this.http
    .get(url, {params: {'projectId': projectId}, headers: this.headers}) 
    .map(res => res.json() as User[]);
   }

   //给用户添加一个项目时，user中的projectIds需要对应的添加
   addProjectRef(user: User, projectId: string): Observable<User>{
    const url = `${this.config.url}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    //判断如果projectId已经在projecteIds里面，就直接返回user自己
    if(projectIds.indexOf(projectId) > -1){
        return Observable.of(user);
    }
    return this.http
    .patch(url, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
        .map(res => res.json() as User);
   }

   //从这个项目中移走用户时，user中的projectIds需要对应的删除
   removedProjectRef(user: User, projectId: string): Observable<User>{
    const url = `${this.config.url}/${this.domain}/${user.id}`;
    const projectIds = user.projectIds ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);

    //projecteIds里面不存在这个projectId，就直接返回user自己
    if(index === -1){
        return Observable.of(user);
    }
    //在数组中刚好去掉了序号index对应的那个projectId
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
        .patch(url, JSON.stringify({projectIds: toUpdate}), {headers: this.headers})
        .map(res => res.json() as User);
   }

   //批量添加
   batchUpdateProjectRef(project: Project): Observable<User[]>{
    const projectId = project.id;
    const memberIds = project.menbers ? project.menbers : [];
    //将项目的成员们转化成一个流，根据每一个成员的id，得到一个流，取得他的projectIds
    //如果不switchMap拍扁的话，得到的Observable<User>拍之后得到的就是User.
    return Observable.from(memberIds)
        .switchMap(id => {
            const url = `${this.config.url}/${this.domain}/${id}`;
            return this.http
                .get(url)
                .map(res => res.json() as User);
        })
        //过滤出projectId不在该成员的projectIds中的成员
        .filter(user => user.projectIds.indexOf(projectId) === -1)
        //在把这个user加到这个project中来
        .switchMap(u => this.addProjectRef(u, projectId))
        //得到的时一系列的流，转成数组
        .reduce( (arr, curr) => [...arr, curr], []);
   }

}