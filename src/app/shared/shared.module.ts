import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule,MatCardModule, MatInputModule,MatListModule, MatSlideToggleModule,
  MatGridListModule, MatDialogModule, MatAutocompleteModule, MatMenuModule, MatCheckboxModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatButtonToggleModule
} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { DirectiveModule } from '../directive/directive.module';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  //既倒入也导出，别处也可用，不仅限于shared.Module模块
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
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
    MatSelectModule,
    MatSidenavModule,
    DirectiveModule,
    ImageListSelectComponent,  //导出后，其他模块才能用
    AgeInputComponent,  //导出后，其他模块才能用
  ],
  declarations: [
    ConfirmDialogComponent,
    AgeInputComponent,
    ImageListSelectComponent
  ],
  entryComponents:[
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
