import { NgModule } from '@angular/core';

import { MistoreAdminRoutingModule } from '@admin/mistore-admin-routing.module';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { GeneralUsersComponent } from './components/views/general-users/general-users.component';
import { ProductsStatisticsComponent } from './components/views/products-statistics/products-statistics.component';
import { BrandsIndexComponent } from './components/views/brands/index/brands.component';
import { AdminCategoriesComponent } from './components/views/admin-categories/index/admin-categories.component';
import { CreateBrandComponent } from './components/views/brands/create/create-brand.component';
import { CreateAdminCategoriesComponent } from './components/views/admin-categories/create/create-admin-categories.component';
import { AdminSubcategoriesComponent } from './components/views/admin-subcategories/index/admin-subcategories.component';
import { CreateAdminSubcategoriesComponent } from './components/views/admin-subcategories/create/create-admin-subcategories.component';
import { CreateAdminStoresComponent } from './components/views/stores/create/create-admin-stores.component';
import { AdminStoresComponent } from './components/views/stores/index/admin-stores.component';
import { ComplaintsComponent } from './components/views/complaints/complaints.component';
import { AdvertisementsComponent } from './components/views/advertisements/advertisements.component';

@NgModule({
  declarations: [
    MistoreAdminComponent,
    DashboardComponent,
    GeneralUsersComponent,
    ProductsStatisticsComponent,
    BrandsIndexComponent,
    AdminCategoriesComponent,
    CreateBrandComponent,
    CreateAdminCategoriesComponent,
    AdminSubcategoriesComponent,
    CreateAdminSubcategoriesComponent,
    CreateAdminStoresComponent,
    AdminStoresComponent,
    ComplaintsComponent,
    AdvertisementsComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    MistoreAdminRoutingModule
  ]
})
export class MistoreAdminModule { }
