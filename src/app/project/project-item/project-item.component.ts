import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  @Output() onInvite = new EventEmitter<void>();  //点击邀请按钮是，告诉父组件，而不是自己做处理

  constructor() { }

  ngOnInit() {
  }
  onInviteClick(){
    this.onInvite.emit();
  }

}
