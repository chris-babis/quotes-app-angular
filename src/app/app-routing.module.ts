import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './User/user/user.component';
import { HeaderComponent } from './logged_in_components/header/header.component';
import { AuthGuard } from './logged_in_components/auth.guard';
import { AdminGuard } from './logged_in_components/admin.guard';
import { MainPageComponent } from './logged_in_components/main-page/main-page.component';
import { UploadComponent } from './logged_in_components/upload/upload.component';
import { AwaitingComponent } from './logged_in_components/awaiting/awaiting.component';
import { HomeComponent } from './logged_in_components/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch:'full'},
  {path: 'register', component: UserComponent},
  {path: 'login', component: UserComponent},
  {path: 'user', component: HeaderComponent, canActivate:[AuthGuard], children:[
    {path: '', component: HomeComponent},
    {path: 'me',component:MainPageComponent},
    {path: 'upload',component:UploadComponent},
    {path: 'awaiting',component:AwaitingComponent, canActivate:[AdminGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
