import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';

const routes: Routes = [{ path: '', component: MistoreAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MistoreAdminRoutingModule { }
