import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MessageComponent } from './components/message/message.component';
import { MaterialModule } from './material.module';

@NgModule({
    MessageComponent
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    FormsModule
  ]
})
export class SharedModule { }
