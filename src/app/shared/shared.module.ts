import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';


@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    IconComponent
  ]
})
export class SharedModule { }
