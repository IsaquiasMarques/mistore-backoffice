import { NgModule } from '@angular/core';

import { MistoreAdminRoutingModule } from '@admin/mistore-admin-routing.module';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { GeneralUsersComponent } from './components/views/general-users/general-users.component';
import { ProductsStatisticsComponent } from './components/views/products-statistics/products-statistics.component';
import { BrandsIndexComponent } from './components/views/brands/index/brands.component';

@NgModule({
  declarations: [
    MistoreAdminComponent,
    DashboardComponent,
    GeneralUsersComponent,
    ProductsStatisticsComponent,
    BrandsIndexComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    MistoreAdminRoutingModule
  ]
})
export class MistoreAdminModule { }
