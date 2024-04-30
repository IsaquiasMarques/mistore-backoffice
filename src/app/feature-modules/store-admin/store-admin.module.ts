import { NgModule } from '@angular/core';

import { StoreAdminRoutingModule } from '@store/store-admin-routing.module';
import { StoreAdminComponent } from '@store/components/containers/store-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from '@store/components/views/dashboard/dashboard.component';
import { ProductsComponent } from '@store/components/views/products/index/products.component';
import { PromotionsComponent } from '@store/components/views/promotions/promotions.component';
import { FavoritesComponent } from '@store/components/views/favorites/favorites.component';
import { WalletComponent } from '@store/components/views/wallet/wallet.component';
import { MessagesComponent } from '@store/components/views/messages/messages.component';
import { HelpComponent } from '@store/components/views/help/help.component';
import { CreateProductComponent } from '@store/components/views/products/create/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StoreAdminComponent,
    DashboardComponent,
    ProductsComponent,
    CreateProductComponent,
    PromotionsComponent,
    FavoritesComponent,
    WalletComponent,
    MessagesComponent,
    HelpComponent,
  ],
  imports: [
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    StoreAdminRoutingModule
  ]
})
export class StoreAdminModule { }
