import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    LoadingSpinnerComponent,
    MessageComponent,
    FormsModule
  ]
})
export class SharedModule { }
