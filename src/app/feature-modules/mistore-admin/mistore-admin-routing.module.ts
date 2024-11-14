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
import { AdminSubcategoriesComponent } from './components/views/admin-subcategories/index/admin-subcategories.component';
import { CreateAdminSubcategoriesComponent } from './components/views/admin-subcategories/create/create-admin-subcategories.component';
import { AdminStoresComponent } from './components/views/stores/index/admin-stores.component';
import { CreateAdminStoresComponent } from './components/views/stores/create/create-admin-stores.component';

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
          },
        ]
      },
      {
        path: 'subcategories',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            component: AdminSubcategoriesComponent,
            title: `Subcategorias ${ mistoreSignature }`
          },
          {
            path: 'create',
            component: CreateAdminSubcategoriesComponent,
            title: `Subcategorias ${ mistoreSignature }`
          },
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            redirectTo: 'index',
            pathMatch: 'full'
          },
          {
            path: 'index',
            component: AdminStoresComponent,
            title: `Lojas ${ mistoreSignature }`,
          },
          {
            path: 'create',
            component: CreateAdminStoresComponent,
            title: `Lojas ${ mistoreSignature }`,
          },
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
