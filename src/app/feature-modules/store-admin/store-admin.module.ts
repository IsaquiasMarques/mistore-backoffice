import { NgModule } from '@angular/core';

import { StoreAdminRoutingModule } from '@store/store-admin-routing.module';
import { StoreAdminComponent } from '@store/components/containers/store-admin.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { DashboardComponent } from '@store/components/views/dashboard/dashboard.component';
import { ProductsComponent } from '@store/components/views/products/products.component';
import { PromotionsComponent } from '@store/components/views/promotions/promotions.component';
import { FavoritesComponent } from '@store/components/views/favorites/favorites.component';
import { WalletComponent } from '@store/components/views/wallet/wallet.component';
import { MessagesComponent } from '@store/components/views/messages/messages.component';
import { HelpComponent } from '@store/components/views/help/help.component';


@NgModule({
  declarations: [
    StoreAdminComponent,
    DashboardComponent,
    ProductsComponent,
    PromotionsComponent,
    FavoritesComponent,
    WalletComponent,
    MessagesComponent,
    HelpComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    StoreAdminRoutingModule
  ]
})
export class StoreAdminModule { }
