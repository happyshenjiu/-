import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { QuoteService } from '../../service/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就，全新努力定会胜利满满！',
    en: 'Satisfaction lies in continuous efforts, not existing achievements, new efforts will be full of success!',
    pic: '/assets/images/quote_fallback.jpg'
  };

  constructor( 
    private fb: FormBuilder,
    private quoteService$: QuoteService   //后面加一个$表示这是一个流
  ) {
    this.quoteService$
    .getQuote()
    .subscribe(q => this.quote = q);
   }

  ngOnInit() {
   /* this.form = new FormGroup({
      // email: new FormControl('yujinhua@163.com', Validators.required),  // 初始化email的值，以及添加验证器
      email: new FormControl('yujinhua@163.com', Validators.compose([Validators.required, Validators.email])),  //添加多个验证器
      password: new FormControl('', Validators.required)
    });*/

    this.form = this.fb.group({
      email: ['yujinhua@163.com', Validators.compose([Validators.required, Validators.email])],
      // email: ['yujinhua@163.com', Validators.compose([Validators.required, Validators.email,this.validate])],  //应用自定义验证器
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit({value, valid}, ev: Event){
    ev.preventDefault();
    console.log( JSON.stringify(value) );
    console.log( JSON.stringify(valid) );
    //动态的设置验证规则
    //相当于再上面的email的验证器数组中再添加一项我们刚自定义的验证器 this.validate
    // this.form.controls['email'].setValidators(this.validate);
  }

  //自定义一个验证器
  validate(c: FormControl): {[key: string]:any} {

    //如果 FormControl 的值为空，说明合法
    if(!c.value){
      return null;
    }
    const patten = /^yujinhua+/;
    if( patten.test(c.value) ){
      return null;   //如果验证成功的话，返回null
    }
    return {
      emailNotValid: 'The email must start with yujinhua'
    };
  }

}
