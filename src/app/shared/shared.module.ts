import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';
import { ReplaceBy } from './pipes/number/replace-by.pipe';
import { SvgComponent } from './components/ui/svg/svg.component';


@NgModule({
  declarations: [
    IconComponent,
    ReplaceBy,
    SvgComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    IconComponent,
    SvgComponent,
    ReplaceBy
  ]
})
export class SharedModule { }
