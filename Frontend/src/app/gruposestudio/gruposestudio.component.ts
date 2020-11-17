import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gruposestudio',
  templateUrl: './gruposestudio.component.html',
  styleUrls: ['./gruposestudio.component.css']
})
export class GruposestudioComponent implements OnInit {

  public titulo:String;
  public celulas:object[];
  public siervos:object[];
  public dominical:object[];
  public restauracion:object[];
  public cel:boolean;
  public sie:boolean;
  public dom:boolean;
  public res:boolean;

  constructor(private auth:AuthService,private router:Router) { 
    this.cel=false;
    this.sie=false;
    this.dom=false;
    this.res=false;
  }

  ngOnInit(): void {
   this.obtenerIntegrantes();
  }

  registrosSiervo(){
    this.titulo='Escuela de siervos';
    this.cel=false;
    this.sie=true;
    this.dom=false;
    this.res=false;
    document.getElementById('registros').style.display='block';
  
  }

  registrosRestauracion(){
    this.titulo='Casas de restauración';
    this.cel=false;
    this.sie=false;
    this.dom=false;
    this.res=true;
    document.getElementById('registros').style.display='block';
   
  }

  registrosCelulas(){
    this.titulo='Celulas'
    this.cel=true;
    this.sie=false;
    this.dom=false;
    this.res=false;
    document.getElementById('registros').style.display='block';
  }

  registrosDominical(){
    this.titulo='Escuela dominical';
    this.cel=false;
    this.sie=false;
    this.dom=true;
    this.res=false;
    document.getElementById('registros').style.display='block';
  }
  ocultarRegistros(){
    document.getElementById('registros').style.display='none';
  }

  obtenerIntegrantes(){
    this.auth.obtenerFeligreses().subscribe(
      (res)=>{
        
        this.celulas=res.filter(int=>int['grupo']==='Celulas');
        this.siervos=res.filter(int=>int['grupo']==='Escuela de siervos');
        this.dominical=res.filter(int=>int['grupo']==='Escuela dominical');
        this.restauracion=res.filter(int=>int['grupo']==='Restauración');
  
      },
      (err)=>console.log(err)
    )
  }
  

}
