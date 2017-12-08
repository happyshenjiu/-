import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatIconModule, MatButtonModule,MatCardModule, MatInputModule,MatListModule, MatSlideToggleModule,
  MatGridListModule, MatDialogModule, MatAutocompleteModule, MatMenuModule, MatCheckboxModule, MatTooltipModule,MatTooltip } from '@angular/material';

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
    MatTooltipModule
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
    MatTooltipModule
  ],
  declarations: []
})
export class SharedModule { }
