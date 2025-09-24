import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { create } from 'domain';
import { Create } from './create/create';
import { Update } from './update/update';
import { View } from './view/view';

export const routes: Routes = [
    {path:'', component:Dashboard, pathMatch:'full'},
    {path:'dashboard', component:Dashboard},
    {path:'create', component:Create},
    {path:'update/:id', component:Update},
    {path:'view/:id', component:View}
];
