import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';
import { ReplaceCommaByDotPipe } from './pipes/number/replace-comma-by-dot.pipe';


@NgModule({
  declarations: [
    IconComponent,
    ReplaceCommaByDotPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    IconComponent,
    ReplaceCommaByDotPipe
  ]
})
export class SharedModule { }
