import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './templates/auth/auth.component';
import { StoreAdminComponent } from './templates/store-admin/store-admin.component';
import { MistoreAdminComponent } from './templates/mistore-admin/mistore-admin.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./feature-modules/auth/auth.module').then(m => m.AuthModule)
      }
    ],
  },
  {
    path: '',
    component: StoreAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'store',
        pathMatch: 'full'
      },
      {
        path: 'store',
        loadChildren: () => import('./feature-modules/store-admin/store-admin.module').then(m => m.StoreAdminModule)
      }
    ],
    // canActivate: 
  },
  {
    path: '',
    component: MistoreAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      },
      {
        path: 'admin',
        loadChildren: () => import('./feature-modules/mistore-admin/mistore-admin.module').then(m => m.MistoreAdminModule)
      }
    ],
    // canActivate: 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
