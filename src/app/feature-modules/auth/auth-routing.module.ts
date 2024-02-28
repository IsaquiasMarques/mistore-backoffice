import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/containers/auth.component';
import { SignInComponent } from './components/views/sign-in/sign-in.component';
import { SignUpComponent } from './components/views/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      },
      {
        path: 'sign-in',
        title: 'Entrar na minha conta - Mistore, Autenticação',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        title: 'Criar a minha conta - Mistore, Autenticação',
        component: SignUpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
