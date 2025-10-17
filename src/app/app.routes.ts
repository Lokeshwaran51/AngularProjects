import { Routes } from '@angular/router';
import { Login } from './login/login';

export const routes: Routes = [
    {path:'', component:Login, pathMatch:'full'},
    {path:'dashboard', 
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
    {path:'create',
        loadComponent: () => import('./create/create').then(m => m.Create) },
    {path:'update/:id', 
        loadComponent: () => import('./update/update').then(m => m.Update) },
    {path:'view/:id', 
        loadComponent: () => import('./view/view').then(m => m.View) },
    { path: 'signup',
        loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp) },
    { path: 'login',
        loadComponent:()=>import('./login/login').then(m => m.Login) },
    { path: 'profile', 
        loadComponent: () => import('./profile/profile').then(m => m.Profile) },
    { path:'**', redirectTo:'./login/login', pathMatch:'full'}
];
