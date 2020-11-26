import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminUrl = `http://localhost:3000/api/usuario/`;//crear admin
  private loginUrl = `http://localhost:3000/api/auth/`;//ingresar
  private feligresUrl = `http://localhost:3000/api/feligres/`;//crear feligres
  private aportesUrl = `http://localhost:3000/api/aportes/`;//aportes-->
   
  constructor(private http:HttpClient,private router:Router) { }

  tokensave=''

  crearAdmin(admin){
   return this.http.post<any>(this.adminUrl,admin)
  }  
  obtenerAdmins(){
    return this.http.get<any>(this.adminUrl);
  }   
  eliminarAdmin(id){
    return this.http.delete<any>(this.adminUrl+id);
  } 
  editarAdmin(id,admin){
    return this.http.put<any>(this.adminUrl+id,admin);
  }
  loginAdmin(admin){
    return this.http.post<any>(this.loginUrl,admin)
  }
  crearFeligres(feligres){
    return this.http.post<any>(this.feligresUrl,feligres)
  }
  obtenerFeligreses(){
    return this.http.get<any>(this.feligresUrl)
  }
  eliminarFeligres(id){
    return this.http.delete<any>(this.feligresUrl+id)
  }
  editarFeligres(id,admin){
    return this.http.put<any>(this.feligresUrl+id,admin);
  }
  loginOn(){
    this.tokensave=localStorage['token'];
    return !!localStorage['token'];
  }
  obtenerToken(){
    return this.tokensave;
  }
  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/'])
  }
  obtenerRuta(){
    return localStorage['ruta'];
  }
  obtenerRol(){
    return localStorage['rol']
  }

  crearAportes(aportes){
    return this.http.post<any>(this.aportesUrl,aportes)
  }
  obtenerAportes(){
    return this.http.get<any>(this.aportesUrl)
  }
  eliminarAportes(id){
    return this.http.delete<any>(this.aportesUrl+id)
  }
  editarAportes(id,admin){
    return this.http.put<any>(this.aportesUrl+id,admin);
  }
}
