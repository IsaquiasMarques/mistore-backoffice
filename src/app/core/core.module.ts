import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HzBarComponent } from './components/charts/hz-bar/hz-bar.component';
import { VtBarComponent } from './components/charts/vt-bar/vt-bar.component';


@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    HzBarComponent,
    VtBarComponent
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    SidebarMenuComponent,
    HeaderComponent,
    HzBarComponent,
    VtBarComponent
  ],
})
export class CoreModule { }
