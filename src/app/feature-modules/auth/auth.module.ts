import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from '@auth/auth-routing.module';
import { AuthComponent } from '@auth/components/containers/auth.component';
import { SignInComponent } from '@auth/components/views/sign-in/sign-in.component';
import { SignUpComponent } from '@auth/components/views/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
