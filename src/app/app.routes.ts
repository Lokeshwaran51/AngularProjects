import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {path:'', component:Dashboard, pathMatch:'full'},
    {path:'dashboard', component:Dashboard},
    {path:'create',
        loadComponent: () => import('./create/create').then(m => m.Create)},
    {path:'update/:id', 
        loadComponent: () => import('./update/update').then(m => m.Update)
    },
    {path:'view/:id', 
        loadComponent: () => import('./view/view').then(m => m.View)
    }
];
