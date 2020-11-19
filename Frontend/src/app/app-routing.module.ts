import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearadminComponent } from './crearadmin/crearadmin.component';
import { GruposestudioComponent } from './gruposestudio/gruposestudio.component';
import { ConsolidacionComponent } from './consolidacion/consolidacion.component';
import { AportesComponent } from './aportes/aportes.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'aportes',component:AportesComponent,canActivate:[AuthGuard]},
  {path:'consolidacion',component:ConsolidacionComponent,canActivate:[AuthGuard]},
  {path:'crear-admin',component:CrearadminComponent,canActivate:[AuthGuard]},
  {path:'grupos-estudio',component:GruposestudioComponent,canActivate:[AuthGuard]},
  {path:'ministerios',component:MinisteriosComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
