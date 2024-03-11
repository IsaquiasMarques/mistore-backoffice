import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';
import { ReplaceBy } from './pipes/number/replace-by.pipe';


@NgModule({
  declarations: [
    IconComponent,
    ReplaceBy,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    IconComponent,
    ReplaceBy
  ]
})
export class SharedModule { }
