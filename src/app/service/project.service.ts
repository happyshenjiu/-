import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {

    private readonly domain = 'projects';
    private headers = new Headers({
        'Content-Type': 'application/json'
    });
    constructor(
        private http: Http,
        @Inject('BASE_CONFIG') private config
    ){}

    //POST
    add(project: Project): Observable<Project>{
        project.id = null;
        const url = `${this.config.url}/${this.domain}`;
        return this.http
        .post(url, JSON.stringify(project), {headers: this.headers})
        .map(res => res.json());
    }

    //PUT:将整个project都更新一遍
    //patch: 可以值更新指定的某些属性
    update(project: Project): Observable<Project>{
        const url = `${this.config.url}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
        .patch(url, JSON.stringify(toUpdate), {headers: this.headers})
        .map(res => res.json());
    }

    //DELETE
    //删除一个项目：删除项目+删除其下面的所有任务列表,任务列表下面所有任务
    //先删除list,json-server会级联删除task，在删除project
    //mergeMap: 当有新的listId进来，之前删除该列表的动作还是继续，保证删的干净（所有流都保留）
    //switchMap：反正只有count()之后发送过来一个数据，也就只要保留这最后一个流就好了
    del(project: Project): Observable<Project>{
       const delTasks$ = Observable.from(project.taskLists? project.taskLists : [])
            .mergeMap(
                listId => this.http.delete(`${this.config.url}/taskLists/${listId}`)
            )
            .count();  //mergeMap之是一系列流的数组，count()统计删除列表之后的流的数量，输出一个数量

        //当删除完所有列表之后，发出一个数值，然后进行删除project
        return delTasks$
            .switchMap( _ => this.http.delete(`${this.config.url}/${this.domain}/${project.id}`))
            .mapTo(project); //返回输入的这个project
    }

    //GET
    //取得项目列表
     get(userId: string): Observable<Project[]>{
    const url = `${this.config.url}/${this.domain}`;
    return this.http
      .get(url, {params: {'members_like': userId}, headers: this.headers})  //params是筛选的条件，在http://localhost:3000/projects中找project.userId跟我们这里参数userId相同的所有project
      .map(res => res.json() as Project[]);
  }

}
