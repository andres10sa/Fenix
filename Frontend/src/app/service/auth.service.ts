import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private adminUrl = `http://localhost:3000/api/usuario/`;//crear admin
  private loginUrl = `http://localhost:3000/api/auth/`;//ingresar
  private feligresUrl = `http://localhost:3000/api/feligres/`;//crear feligres
 
   
  constructor(private http:HttpClient) { }

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
    return !!localStorage['token'];
  }
  obtenerToken(){
    return localStorage['token']
  }
}
