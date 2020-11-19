import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AsideComponent } from './aside/aside.component';
import { GruposestudioComponent } from './gruposestudio/gruposestudio.component';
import { ConsolidacionComponent } from './consolidacion/consolidacion.component';
import { CrearadminComponent } from './crearadmin/crearadmin.component';
import { MinisteriosComponent } from './ministerios/ministerios.component';
import { AportesComponent } from './aportes/aportes.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ModulosComponent } from './home/modulos/modulos.component';
import { PlanesComponent } from './home/planes/planes.component';
import { ContactanosComponent } from './home/contactanos/contactanos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    GruposestudioComponent,
    ConsolidacionComponent,
    CrearadminComponent,
    MinisteriosComponent,
    AportesComponent,
    LoginComponent,
    HomeComponent,
    ModulosComponent,
    PlanesComponent,
    ContactanosComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
