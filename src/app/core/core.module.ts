import { NgModule } from '@angular/core';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HzBarComponent } from './components/charts/hz-bar/hz-bar.component';
import { VtBarComponent } from './components/charts/vt-bar/vt-bar.component';
import { AdsComponent } from './components/ads/ads.component';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './components/table/table.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/in-memory-web-api/in-memory-data.service';
import { RouterModule } from '@angular/router';
import { WidgetComponent } from './components/widget/widget.component';


@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    HzBarComponent,
    VtBarComponent,
    AdsComponent,
    TableComponent,
    WidgetComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false, delay: 3000 }
    ),
  ],
  exports: [
    SidebarMenuComponent,
    HeaderComponent,
    HzBarComponent,
    VtBarComponent,
    AdsComponent,
    TableComponent,
    WidgetComponent
  ],
})
export class CoreModule { }
