import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MistoreAdminRoutingModule } from '@admin/mistore-admin-routing.module';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';


@NgModule({
  declarations: [
    MistoreAdminComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    MistoreAdminRoutingModule
  ]
})
export class MistoreAdminModule { }
