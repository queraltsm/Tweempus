import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyTwimpsComponent } from './profile/my-twimps/my-twimps.component';
import { FavouriteTwimpsComponent } from './profile/favourite-twimps/favourite-twimps.component';
import { ErrorComponent } from './error/error.component';
import { authGuard } from './core/auth.guard';
import { SignupComponent } from './login/signup/signup.component';
import { CreateTwimpComponent } from './create-twimp/create-twimp.component';

export const routes: Routes = [
    {path:'', redirectTo:'/dashboard', pathMatch: 'full'},
    {path:'dashboard',component:DashboardComponent, title:'Dashboard | Tweempus', canActivate: [authGuard]},
    {path:'login',component:LoginComponent, title:'Login | Tweempus'},
    {path:'signup',component:SignupComponent, title:'Signup | Tweempus'},
    {path:'create-twimp',component:CreateTwimpComponent, title:'Create Twimp | Tweempus'},
    {path:'profile/:id',component:ProfileComponent, title:'User Profile | Tweempus'},
    { 
        path:'profile',
        component:ProfileComponent,
        children:[
            {
                path: '',
                redirectTo: 'my-twimps',
                pathMatch: 'full'
            },
            {
                path: 'my-twimps',
                component: MyTwimpsComponent,
                title: 'My Twimps | Tweempus'
            },
            {
                path: 'favourite-twimps',
                component: FavouriteTwimpsComponent,
                title: 'Favourite Twimps | Tweempus'
            },

    ]},
    {path:'**',component:ErrorComponent, title:'404 Error | Tweempus'},
];
