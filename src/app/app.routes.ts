import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { PostpageComponent } from './postpage/postpage.component';
import { AllpostComponent } from './allpost/allpost.component';
import { EditpostComponent } from './editpost/editpost.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FriendsComponent } from './friends/friends.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
import { HomeSection3Component } from './home-section3/home-section3.component';



export const routes: Routes = [

    {
        path:'',
        component:LoginComponent
    },
    {
        path:"home-page",
        component:HomeComponent ,
        canActivate:[authGuard]
    },
    {
        path:"video",
        loadComponent:()=>import("./video/video.component").then(comp => comp.VideoComponent),
        canActivate:[authGuard]

    },
    {
        path:"allusers",
        component:HomeSection3Component,
        canActivate:[authGuard]
    },
    {
        path:"new-post/:id",
        component:PostpageComponent,
        canActivate:[authGuard]
    },
    {
        path:"all-post/:id",
        component:AllpostComponent,
        canActivate:[authGuard]
    },
    {
        path:"edit-post/:id",
        component:EditpostComponent,
        canActivate:[authGuard]
    },
    {
        path:"user-profile/:id",
        component:UserProfileComponent,
        canActivate:[authGuard]
    },
    {
        path:"friends",
        component:FriendsComponent,
        canActivate:[authGuard]
    },
    {
        path:"market",
        loadComponent:()=>import("./marketplace/marketplace.component").then(market => market.MarketplaceComponent),
        canActivate:[authGuard]
    },
    {
        path:"addProduct",
        component:AddproductComponent,
        canActivate:[authGuard]
    },
    {
        path:"product/:id",
        component:ProductComponent,
        canActivate:[authGuard]
    },

];
