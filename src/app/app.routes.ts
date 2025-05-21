import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AllBlogsComponent } from './pages/all-blogs/all-blogs.component';
import { MyBlogsComponent } from './pages/my-blogs/my-blogs.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
     
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:DashboardComponent,
        children:[
            {
                path:'all-blogs',
                component:AllBlogsComponent
            },
            {
                path:'my-blogs',
                component:MyBlogsComponent
            },
            {
                path:'**',
                redirectTo:'all-blogs'
            }
        ]
    },
    {
        path:'**',
        redirectTo:'login'
    }
];
