import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  items = [
    {
      id:1,
      name:"Zhangsan"
    },
  {
    id:2,
    name:"Lisi"
  },{
    id:3,
      name:"Wanger"
  }
  ];
  constructor() { }

  ngOnInit() {
  }

  displayUser(user:{id: string, name: string}){
    return user? user.name:'';
  }

}
