import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule,MatCardModule, MatInputModule,MatListModule, MatSlideToggleModule,
  MatGridListModule, MatDialogModule, MatAutocompleteModule, MatMenuModule, MatCheckboxModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  //既倒入也导出，别处也可用，不仅限于shared.Module模块
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  exports:[
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
