import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { DashboardComponent } from '@admin/components/views/dashboard/dashboard.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MistoreAdminRoutingModule { }
