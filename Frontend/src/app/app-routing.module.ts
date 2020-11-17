import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearadminComponent } from './crearadmin/crearadmin.component';
import { GruposestudioComponent } from './gruposestudio/gruposestudio.component';
import { ConsolidacionComponent } from './consolidacion/consolidacion.component';
import { AportesComponent } from './aportes/aportes.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'aportes',component:AportesComponent},
  {path:'consolidacion',component:ConsolidacionComponent},
  {path:'crear-admin',component:CrearadminComponent},
  {path:'grupos-estudio',component:GruposestudioComponent},
  {path:'ministerios',component:MinisteriosComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
