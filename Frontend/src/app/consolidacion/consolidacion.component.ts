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
  public busqueda:string;//Término que lee del input de busqueda
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
        console.log(res)

        if(this.busqueda){
          let nuevo=res;
          let actual=[];

          nuevo.forEach(ele => {
            let nombres =ele['nombres'].toLowerCase();
            let apellidos=ele['apellidos'].toLowerCase();
            let grupo=ele['grupo'].toLowerCase();
            let correo=ele['correo'].toLowerCase();
            let ministerio =ele['ministerio'].toLowerCase();
            let termino=this.busqueda.toLowerCase();
         
             if(nombres.includes(termino) || apellidos.includes(termino) || grupo.includes(termino) || correo.includes(termino)|| ministerio.includes(termino) ){
               actual.push(ele);
           }
          
        });
        let ordenado=actual;
        ordenado=this.ordenarArray(ordenado,'nombres');
        this.feligreses=ordenado;
        }
        else{
          this.feligreses=this.ordenarArray(res,'nombres');
        }

        let correos=[];
        res.forEach(ele=>correos.push(ele['correo']));
        this.correos=correos;
        
      },
      (err)=>console.log(err)
    )
    
  }
  filtrar(){
    this.funcionalidadFlechas('na','nz','aa','az','eda','edz','ema','emz','ma','mz','ga','gz');
    this.obtenerFeligreses();
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
  ordenarArray(array,propiedad){
    array.sort((a,b)=>{
      if(a[propiedad]<b[propiedad]){
        return -1;
      }
      if(a[propiedad]>b[propiedad]){
        return 1;
      }
      return 0;
   })
   return array;
  }
  desordenarArray(array,propiedad){
    array.sort((a,b)=>{
      if(a[propiedad]<b[propiedad]){
        return 1;
      }
      if(a[propiedad]>b[propiedad]){
        return -1;
      }
      return 0;
   })
   return array;
  }
  nombreAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'nombres');
    this.funcionalidadFlechas('na','nz','aa','az','eda','edz','ema','emz','ma','mz','ga','gz');
  }
  nombreDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'nombres');
    this.funcionalidadFlechas('nz','na','aa','az','eda','edz','ema','emz','ma','mz','ga','gz');
  }
  apellidoAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'apellidos');
    this.funcionalidadFlechas('aa','nz','na','az','eda','edz','ema','emz','ma','mz','ga','gz');
  }
  apellidoDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'apellidos');
    this.funcionalidadFlechas('az','na','aa','nz','eda','edz','ema','emz','ma','mz','ga','gz');
  }
  emailAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'correo');
    this.funcionalidadFlechas('ema','nz','na','az','eda','edz','ga','emz','ma','mz','aa','gz');
  }
  emailDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'correo');
    this.funcionalidadFlechas('emz','na','aa','nz','eda','edz','ema','gz','ma','mz','ga','az');
  }
  grupoAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'grupo');
    this.funcionalidadFlechas('ga','nz','na','az','eda','edz','ema','emz','ma','mz','aa','gz');
  }
  grupoDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'grupo');
    this.funcionalidadFlechas('gz','na','aa','nz','eda','edz','ema','emz','ma','mz','ga','az');
  }
  ministerioAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'ministerio');
    this.funcionalidadFlechas('ma','nz','na','az','eda','edz','ema','emz','ga','mz','aa','gz');
  }
  ministerioDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'ministerio');
    this.funcionalidadFlechas('mz','na','aa','nz','eda','edz','ema','emz','ma','gz','ga','az');
  }
  edadAscendente(){
    this.feligreses=this.ordenarArray(this.feligreses,'edad');
    this.funcionalidadFlechas('eda','nz','na','az','ma','edz','ema','emz','ga','mz','aa','gz');
  }
  edadDescendente(){
    this.feligreses=this.desordenarArray(this.feligreses,'edad');
    this.funcionalidadFlechas('edz','na','aa','nz','eda','mz','ema','emz','ma','gz','ga','az');
  }
 

  funcionalidadFlechas(a,b,c,d,e,f,g,h,i,j,k,l){
     document.getElementById(a).style.color='#fff';
     document.getElementById(b).style.color='#ccc';
     document.getElementById(c).style.color='#ccc';
     document.getElementById(d).style.color='#ccc';
     document.getElementById(e).style.color='#ccc';
     document.getElementById(f).style.color='#ccc';
     document.getElementById(g).style.color='#ccc';
     document.getElementById(h).style.color='#ccc';
     document.getElementById(i).style.color='#ccc';
     document.getElementById(j).style.color='#ccc';
     document.getElementById(k).style.color='#ccc';
     document.getElementById(l).style.color='#ccc';
  }



}
