import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { SignUp } from './sign-up/sign-up';
import { Login } from './login/login';
import { sign } from 'crypto';

export const routes: Routes = [
    {path:'', component:Login, pathMatch:'full'},
    {path:'dashboard', component:Dashboard},
    {path:'create',
        loadComponent: () => import('./create/create').then(m => m.Create)},
    {path:'update/:id', 
        loadComponent: () => import('./update/update').then(m => m.Update)
    },
    {path:'view/:id', 
        loadComponent: () => import('./view/view').then(m => m.View)
    },
    /* {path:'sign-up', 
        loadComponent: () => import('./sign-up/sign-up').then(m => m.SignUp)
    } */
   { path: 'signup', component: SignUp },
   { path: 'login', component: Login },
];
