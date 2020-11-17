import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public logueado:boolean;//Observa si el usuario está logueado
  

  constructor(private auth:AuthService,private router:Router) {
    this.logueado=false;
   }

  ngOnInit(): void {
    this.comprobarSesion();
  }

  comprobarSesion(){
       if(localStorage['sesion']==='true'){
        this.logueado=true;
       }
  }

}
