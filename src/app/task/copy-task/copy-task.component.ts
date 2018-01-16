import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
//MAT_DIALOG_DATA  接受参数
//MatDialogRef 回传参数
@Component({
  selector: 'app-copy-task',
  templateUrl: './copy-task.component.html',
  styleUrls: ['./copy-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyTaskComponent implements OnInit {

  lists: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data,  //打开dialog的时候传过来的数据  this.dialog.open(CopyTaskComponent,data);
    private dialogRef: MatDialogRef<CopyTaskComponent>  //关闭dialog的时候回传数据时用的
) { }

  ngOnInit() {
    this.lists = this.data.lists;
  }

}
