import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MistoreAdminRoutingModule } from '@admin/mistore-admin-routing.module';
import { MistoreAdminComponent } from '@admin/components/containers/mistore-admin.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';


@NgModule({
  declarations: [
    MistoreAdminComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    MistoreAdminRoutingModule
  ]
})
export class MistoreAdminModule { }
