import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { GenerateForgotPasswordLinkComponent } from './generate-forgot-password-link/generate-forgot-password-link.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"home", component:HomeComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'forgot-password', component: GenerateForgotPasswordLinkComponent },
  {path:"", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
