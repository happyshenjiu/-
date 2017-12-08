import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  items: string[];
  constructor() { }

  ngOnInit() {
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    //map();  对nums数组中的每一个元素进行操作，然后返回一个新数组
    this.items = nums.map( d => `avatars:svg-${d}`);
  }

}
