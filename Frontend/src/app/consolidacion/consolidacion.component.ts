import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-consolidacion',
  templateUrl: './consolidacion.component.html',
  styleUrls: ['./consolidacion.component.css']
})
export class ConsolidacionComponent implements OnInit {

  public feligreses:object[];
  public correos:String[];
  public crear:boolean;
  public incompletos:boolean;
  public email:boolean;
  public existe:boolean;
  public id:string;
  constructor(public auth:AuthService,private router:Router) {
    this.incompletos=false;
    this.email=false;
    this.existe=false;
   }

  ngOnInit(): void {
    this.obtenerFeligreses();
    this.ruta();
  }
  ruta(){
    localStorage.setItem('ruta','Consolidación')
  }

  
  datosFeligres ={
    nombres:'',
    apellidos:'',
    documento:'',
    genero:'',
    edad:'',
    celular:'',
    correo:'',
    grupo:'',
    ministerio:''
  }

  agregarFeligres(){
    document.getElementById('consolidacion').style.top='150px';
    document.getElementById('main').style.background='rgba(0, 0, 0, .4)';
    this.datosFeligres={
      nombres:'',
      apellidos:'',
      documento:'',
      genero:'',
      edad:'',
      celular:'',
      correo:'',
      grupo:'',
      ministerio:''
    }
    this.crear=true;
  }
  ocultarFormulario(){
    document.getElementById('consolidacion').style.top='-700px';
    document.getElementById('main').style.background='#fff';
   

  }
  obtenerFeligreses(){
    this.auth.obtenerFeligreses().subscribe(
      (res)=>{

        this.feligreses=res;
        let correos=[];
        res.forEach(ele=>correos.push(ele['correo']));
        this.correos=correos;
        
      },
      (err)=>console.log(err)
    )
    
  }
  eliminarFeligres(id){
    this.auth.eliminarFeligres(id).subscribe(
      (res)=>{
      
        this.obtenerFeligreses();
      },
      (err)=>console.log(err)
    )
  }

 
  guardarDatosFeligres(id,feligres){
    document.getElementById('consolidacion').style.top='150px';
    document.getElementById('main').style.background='rgba(0, 0, 0, .4)';
    const {nombres,apellidos,documento,genero,edad,celular,correo,grupo,ministerio} = feligres
    this.datosFeligres.nombres=nombres;
    this.datosFeligres.apellidos=apellidos;
    this.datosFeligres.documento=documento;
    this.datosFeligres.genero=genero;
    this.datosFeligres.edad=edad;
    this.datosFeligres.celular=celular;
    this.datosFeligres.correo=correo;
    this.datosFeligres.grupo=grupo;
    this.datosFeligres.ministerio=ministerio;
    this.crear=false;
    this.id=id;

  }

  editarFeligres(e){
    e.preventDefault();
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {nombres,apellidos,documento,genero,edad,celular,correo,grupo,ministerio} = this.datosFeligres;
    if(!nombres || !apellidos || !documento || !genero || !edad || !celular || !correo || !grupo || !ministerio){
      return this.incompletos=true;
    }
    this.incompletos=false;
    if (!emailRegex.test(correo)) {
      return this.email=true;
    }
    this.email=false;
    this.auth.editarFeligres(this.id,this.datosFeligres).subscribe(
      (res)=>{
        console.log(res);
        this.obtenerFeligreses();
        this.limpiarFormulario();
      },
      (err)=>console.log(err)
    )
  }

  limpiarFormulario(){
    return this.datosFeligres={
      nombres:'',
      apellidos:'',
      documento:'',
      genero:'',
      edad:'',
      celular:'',
      correo:'',
      grupo:'',
      ministerio:''
    }
  }

  //postear feligres
  postearFeligres(e){
    e.preventDefault();
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {nombres,apellidos,documento,genero,edad,celular,correo,grupo,ministerio} = this.datosFeligres;
    if(!nombres || !apellidos || !documento || !genero || !edad || !celular || !correo || !grupo || !ministerio){
      return this.incompletos=true;
    }
    if (!emailRegex.test(correo)) {
      return this.email=true;
    }
    this.email=false;
    let correoActual=this.correos.find(ele=>ele===correo);
    if(correoActual){
      return this.existe=true;
    }
    this.existe=false;
  
    this.auth.crearFeligres(this.datosFeligres).subscribe(
      (res)=>{
        this.obtenerFeligreses();
        this.limpiarFormulario();
      },
      (err)=>console.log(err)
    )
  }
}
