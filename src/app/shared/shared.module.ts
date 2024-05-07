import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from './components/ui/icon/icon.component';
import { ReplaceByPipe } from './pipes/number/replace-by.pipe';
import { SvgComponent } from './components/ui/svg/svg.component';
import { DataFormatPipe } from './pipes/number/data-format.pipe';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';


@NgModule({
  declarations: [
    IconComponent,
    ReplaceByPipe,
    SvgComponent,
    DataFormatPipe,
    DragAndDropDirective,
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
    ReplaceByPipe,
    DataFormatPipe
  ],
})
export class SharedModule { }
