import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ministerios',
  templateUrl: './ministerios.component.html',
  styleUrls: ['./ministerios.component.css']
})
export class MinisteriosComponent implements OnInit {

  public titulo:String; 
  public ala:boolean;
  public uji:boolean;
  public aud:boolean;
  public int:boolean;
  public juv:boolean;
  public inf:boolean;
  public alaban:object[];
  public ujier:object[];
  public audio:object[];
  public inter:object[];
  public juve:object[];
  public infa:object[];

  constructor(private auth:AuthService,private router:Router) { 
    this.ala=false;
    this.uji=false;
    this.aud=false;
    this.int=false;
    this.juv=false;
    this.inf=false;
  }

  ngOnInit(): void {
    this.obtenerRegistros();
    this.ruta();
  }
  ruta(){
    let url = this.router.url.slice(1)
    localStorage.setItem('ruta','Ministerios')
  }
  alabanza(){
    this.titulo='Alabanza';
    document.getElementById('ministerios').style.display='block';
    this.ala=true;
    this.uji=false;
    this.aud=false;
    this.int=false;
    this.juv=false;
    this.inf=false;
  }
  ujieres(){
    this.titulo='Ujieres';
    document.getElementById('ministerios').style.display='block';
    this.ala=false;
    this.uji=true;
    this.aud=false;
    this.int=false;
    this.juv=false;
    this.inf=false;
  }
  audiovisuales(){
    this.titulo='Audiovisuales';
    document.getElementById('ministerios').style.display='block';
    this.ala=false;
    this.uji=false;
    this.aud=true;
    this.int=false;
    this.juv=false;
    this.inf=false;
  }
  intercesion(){
    this.titulo='Intercesion';
    document.getElementById('ministerios').style.display='block';
    this.ala=false;
    this.uji=false;
    this.aud=false;
    this.int=true;
    this.juv=false;
    this.inf=false;
  }
  juvenil(){
    this.titulo='Juvenil';
    document.getElementById('ministerios').style.display='block';
    this.ala=false;
    this.uji=false;
    this.aud=false;
    this.int=false;
    this.juv=true;
    this.inf=false;
  }
  infantil(){
    this.titulo='Infantil';
    document.getElementById('ministerios').style.display='block';
    this.ala=false;
    this.uji=false;
    this.aud=false;
    this.int=false;
    this.juv=false;
    this.inf=true;
  }
  cerrar(){
    document.getElementById('ministerios').style.display='none';
  }
  obtenerRegistros(){
    this.auth.obtenerFeligreses().subscribe(
      (res)=>{
       
        let alabanza = res.filter(per=>per['ministerio']==='Alabanza');
        let ujieres = res.filter(per=>per['ministerio']==='Ujieres');
        let audiovisuales = res.filter(per=>per['ministerio']==='Audiovisuales');
        let intercesion = res.filter(per=>per['ministerio']==='Intercesión');
        let juvenil = res.filter(per=>per['ministerio']==='Juvenil');
        let infantil = res.filter(per=>per['ministerio']==='Infantil');
        this.alaban=alabanza;
        this.ujier=ujieres;
        this.audio=audiovisuales;
        this.inter=intercesion;
        this.juve=juvenil;
        this.infa=infantil;
      },
      (err)=>console.log(err)
    )
  }

}
