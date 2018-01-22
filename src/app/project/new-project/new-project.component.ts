import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material';
import { FormBuilder,  FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  title = '';
  coverImages = [];
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    //希望备选的这些封面图也是从data传过来
    this.coverImages = this.data.thumbnails;
    //如果传过来的数据又project,说明是修改,那么，那么name的初始值就是该项目的name
    if(this.data.project){
      this.form = this.fb.group(
        {
          name: [this.data.project.name, Validators.required],
          desc: [this.data.project.desc],
          coverImg: [this.data.project.coverImg]
        }
      );
      this.title = "修改项目";
    } else{
      this.form = this.fb.group(
        {
          name: ['', Validators.required],
          desc: [],
          coverImg: [this.data.img]  //创建项目的时候，随机选的这个封面图初始值也是从data传过来
        }
      );
      this.title = "创建项目";
    }

  }

  onSubmit( {value, valid}, ev: Event){
    ev.preventDefault();
    if(!valid){
      return;
    }
    this.dialogRef.close(value);
  }
}
