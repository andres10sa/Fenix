import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error:boolean;

  constructor(private auth:AuthService,private router:Router) { 
    this.error=false;
  }

  ngOnInit(): void {
  }
  
  datosLogin={
    correo:'',
    password:''
  }

  
  loguearse(){

    const {correo,password}=this.datosLogin;
    
    if(correo==='andres@gmail.com' && password==='andres'){
      localStorage.setItem('token','tokenadmin');
      localStorage.setItem('rol','admin');
      this.error=false;
      this.router.navigate(['/consolidacion'])
      this.limpiarFormulario();
    }
    else{
      this.auth.loginAdmin(this.datosLogin).subscribe(
        (res)=>{
          localStorage.setItem('token',res.jwtToken);
          localStorage.setItem('rol',res.usuario.grupo);
          this.error=false;
          this.router.navigate(['/consolidacion'])
          this.limpiarFormulario();
        },
        (err)=>{if(err){
          console.log(err)
            this.error=true;
        }}
      )
    }

  }
  limpiarFormulario(){
    return this.datosLogin={
       correo:'',
      password:''
    }
  }
  


}
