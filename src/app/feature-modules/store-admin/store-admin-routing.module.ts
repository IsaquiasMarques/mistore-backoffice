import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreAdminComponent } from '@store/components/containers/store-admin.component';
import { DashboardComponent } from '@store/components/views/dashboard/dashboard.component';
import { WalletComponent } from '@store/components/views/wallet/wallet.component';
import { ProductsComponent } from './components/views/products/index/products.component';
import { PromotionsComponent } from './components/views/promotions/promotions.component';
import { FavoritesComponent } from './components/views/favorites/favorites.component';
import { MessagesComponent } from './components/views/messages/messages.component';
import { HelpComponent } from './components/views/help/help.component';
import { CreateProductComponent } from './components/views/products/create/create-product.component';
import { LooksComponent } from './components/views/looks/index/looks.component';
import { CreateLookComponent } from './components/views/looks/create/create-look.component';

const mistoreSignature: string = '- Mistore, Conta de Loja';

const routes: Routes = [
  {
    path: '',
    component: StoreAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        title: `Dashboard ${ mistoreSignature }`,
        component: DashboardComponent
      },
      {
        path: 'wallet',
        title: `Minha Carteira ${ mistoreSignature }`,
        component: WalletComponent
      },
      {
        path: 'looks',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            title: `Looks ${ mistoreSignature }`,
            component: LooksComponent,
          },
          {
            path: 'create',
            title: `Adicionar Look ${ mistoreSignature }`,
            component: CreateLookComponent
          },
        ]
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            title: `Produtos ${ mistoreSignature }`,
            component: ProductsComponent
          },
          {
            path: 'create',
            title: `Adicionar Produto ${ mistoreSignature }`,
            component: CreateProductComponent
          },
        ]
      },
      {
        path: 'promotions',
        title: `Promoções ${ mistoreSignature }`,
        component: PromotionsComponent
      },
      {
        path: 'favorites',
        title: `Favoritos ${ mistoreSignature }`,
        component: FavoritesComponent
      },
      {
        path: 'messages',
        title: `Mensagens ${ mistoreSignature }`,
        component: MessagesComponent
      },
      {
        path: 'help',
        title: `Centro de Ajuda ${ mistoreSignature }`,
        component: HelpComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreAdminRoutingModule { }
