import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { authenticationGuard } from './authentication.guard';

export const routes: Routes = [
    {path:'',component:HomeLayoutComponent,canActivate:[authenticationGuard]},
    {path:'login',component:LoginComponent},
    {path:'register',component:SignInComponent}
];
