import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  items: string[];
  private readonly avatarName = 'avatars';
  constructor( private fb: FormBuilder) { }

  ngOnInit() {
    //在图库的avatars中随机选择一张图（0~16）
    const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    //map();  对nums数组中的每一个元素进行操作，然后返回一个新数组
    this.items = nums.map( d => `avatars:svg-${d}`);
    this.form = this.fb.group({
      email: [],
      name: [],
      password: [],
      repeat: [],
      avatar: [img],
      dateOfBirth: ['1990-01-01']
    });
  }

  onSubmit({value,valid}, ev: Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    console.log(value);
  }

}
