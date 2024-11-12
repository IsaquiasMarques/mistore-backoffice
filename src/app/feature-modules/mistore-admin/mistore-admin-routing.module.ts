import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { DashboardComponent } from '@admin/components/views/dashboard/dashboard.component';
import { GeneralUsersComponent } from './components/views/general-users/general-users.component';
import { ProductsStatisticsComponent } from './components/views/products-statistics/products-statistics.component';
import { BrandsIndexComponent } from './components/views/brands/index/brands.component';
import { AdminCategoriesComponent } from './components/views/admin-categories/index/admin-categories.component';
import { CreateBrandComponent } from './components/views/brands/create/create-brand.component';
import { CreateAdminCategoriesComponent } from './components/views/admin-categories/create/create-admin-categories.component';

const mistoreSignature: string = '- Mistore, Administração';

const routes: Routes = [
  {
    path: '',
    component: MistoreAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: `Dashaboard ${ mistoreSignature }`
      },
      {
        path: 'users',
        component: GeneralUsersComponent,
        title: `Usuários ${ mistoreSignature }`,
      },
      {
        path: 'products',
        component: ProductsStatisticsComponent,
        title: `Produtos ${ mistoreSignature }`,
      },
      {
        path: 'brands',
        title: `Marcas ${ mistoreSignature }`,
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            component: BrandsIndexComponent,
          },
          {
            path: 'create',
            component: CreateBrandComponent,
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            component: AdminCategoriesComponent,
            title: `Categorias ${ mistoreSignature }`
          },
          {
            path: 'create',
            component: CreateAdminCategoriesComponent,
            title: `Categorias ${ mistoreSignature }`
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MistoreAdminRoutingModule { }
