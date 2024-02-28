import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SidebarMenuComponent,
    HeaderComponent
  ],
})
export class CoreModule { }
