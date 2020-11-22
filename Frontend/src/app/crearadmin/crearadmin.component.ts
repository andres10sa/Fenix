import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';




@Component({
  selector: 'app-crearadmin',
  templateUrl: './crearadmin.component.html',
  styleUrls: ['./crearadmin.component.css']
})
export class CrearadminComponent implements OnInit {

  public admins:object[];//Listado de admins de DB
  public correos:String[];//Listado con los correos existentes en DB
  public crear:boolean;//Indica si la acción es post o put
  public id:string;//El id del usuario que se va a editar
  public incompletos:boolean;//Verifica si todos los campos están llenos
  public contra:boolean;//Verifica si las contraseñas son iguales
  public email:boolean;//Verifica si el correo es valido
  public existe:boolean;//Verifica si el usuario existe
  public busqueda:string;//Término que lee del input de busqueda
  public tipoFormulario:string//Tipo de formulario de contraseña



  constructor(public auth:AuthService,private router:Router) { 
    this.incompletos=false;
    this.contra=false;
    this.email=false;
    this.existe=false;
  
  }
  
  ngOnInit(): void {
    this.obtenerAdmins();
    this.ruta();
  }
  
  ruta(){
    localStorage.setItem('ruta','Crear administrador')
  }

  datosAdmin ={
    nombres:'',
    apellidos:'',
    grupo:'',
    correo:'',
    password:'',
    password2:''
  }
 
  
  //Muestra el formulario para crear admin
  crearAdmin(){
    document.getElementById('admins').style.top='200px';
    document.getElementById('principal').style.background='rgba(0, 0, 0, .4)';
    this.crear=true;
    this.datosAdmin ={
      nombres:'',
      apellidos:'',
      grupo:'',
      correo:'',
      password:'',
      password2:''
    }
  }
  //Obtener admins
  obtenerAdmins(){
  
    this.auth.obtenerAdmins().subscribe(
      (res)=>{
        if(this.busqueda){
          let nuevo=res;
          let actual=[];
          nuevo.forEach(ele => {
            let nombres =ele['nombres'].toLowerCase();
            let apellidos=ele['apellidos'].toLowerCase();
            let grupo=ele['grupo'].toLowerCase();
            let correo=ele['correo'].toLowerCase();
            let termino=this.busqueda.toLowerCase();
            if(nombres.includes(termino) || apellidos.includes(termino) || grupo.includes(termino) || correo.includes(termino)){
              actual.push(ele);
          }
        });
        let ordenado=actual;
        ordenado=this.ordenarArray(ordenado,'nombres');
        this.admins=ordenado;
        }else{
          this.admins=this.ordenarArray(res,'nombres');
        }

        let correos=[];
        res.forEach(ele=>correos.push(ele['correo']));
        this.correos=correos;
      },
      (err)=>console.log(err)
    )
 
    
  }
  filtrar(){
    this.activarFlecha('nA');
    this.desactivarFlechas('nZ','aA','aZ','gA','gZ','eA','eZ');
    this.obtenerAdmins();
  }

  
  

  eliminarAdmin(id){
   this.auth.eliminarAdmin(id).subscribe(
    (res)=>{
      this.obtenerAdmins();
    },
    (err)=>console.log(err)
  )
  }

  //Editar admin
  editarAdmin(id,admin){
    document.getElementById('admins').style.top='200px';
    document.getElementById('principal').style.background='rgba(0, 0, 0, .4)';
    const {nombres,apellidos,grupo,correo,password,password2}=admin
     this.datosAdmin.nombres=nombres;
     this.datosAdmin.apellidos=apellidos;
     this.datosAdmin.grupo=grupo;
     this.datosAdmin.correo=correo;
     this.datosAdmin.password=password;
     this.datosAdmin.password2=password2;
     this.crear=false;
    this.id=id;

  }

  //Enviar adminEditado
  adminEditado(evt){
    evt.preventDefault();
   const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {correo,password,password2,nombres,apellidos,grupo} = this.datosAdmin;

    if(!correo || !password || !password2 || !nombres || !apellidos || !grupo){
     return this.incompletos=true;
    }
    this.incompletos=false;
    if(password2 !==password){
      this.incompletos=false;
     return this.contra=true;
    }
    this.contra=false;
    if (!emailRegex.test(correo)) {
    return  this.email=true;
    }
    this.email=false;

    this.auth.editarAdmin(this.id,this.datosAdmin).subscribe(
      (res)=>{
        this.obtenerAdmins();
        this.limpiarFormulario();
      },
      (err)=>console.log(err)
    )
  }

  //Cierra el formulario de creación de admin
  cerrarFormulario(){
    document.getElementById('admins').style.top='-700px';
    document.getElementById('principal').style.background='#fff';
    setTimeout(() => {
      this.incompletos=false;
      this.contra=false;
      this.email=false;
      this.existe=false;
    }, 1000);
  

  }
  //postear Admin
  postearAdmin(evt){
    evt.preventDefault();
   const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {correo,password,password2,nombres,apellidos,grupo} = this.datosAdmin;

    if(!correo || !password || !password2 || !nombres || !apellidos || !grupo){
     return this.incompletos=true;
    }
    this.incompletos=false;
    if(password2 !==password){
      this.incompletos=false;
     return this.contra=true;
   
    }
    this.contra=false;
    if (!emailRegex.test(correo)) {
    return this.email=true;
    }
    this.email=false;

    let correoActual=this.correos.find(ele=>ele===correo);
    if(correoActual){
      return this.existe=true;
    }
    this.existe=false;

    this.auth.crearAdmin(this.datosAdmin).subscribe(
      (res)=>{
        console.log(res)
        this.obtenerAdmins();
        this.limpiarFormulario();
        
        
      },
      (err)=>console.log(err)
    )
  }
  limpiarFormulario(){
   return this.datosAdmin ={
      nombres:'',
      apellidos:'',
      grupo:'',
      correo:'',
      password:'',
      password2:''
    }
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
  activarFlecha(a){
    document.getElementById(a).style.color='#fff';
    
   }
   desactivarFlechas(a,b,c,d,e,f,g){
     document.getElementById(a).style.color='grey';
     document.getElementById(b).style.color='grey';
     document.getElementById(c).style.color='grey';
     document.getElementById(d).style.color='grey';
     document.getElementById(e).style.color='grey';
     document.getElementById(f).style.color='grey';
     document.getElementById(g).style.color='grey';
   }
 
  nombreAscendente(){
    this.admins=this.ordenarArray(this.admins,'nombres');
    this.activarFlecha('nA');
    this.desactivarFlechas('nZ','aA','aZ','gA','gZ','eA','eZ');
  }
  nombreDescendente(){
    this.admins=this.desordenarArray(this.admins,'nombres');
    this.activarFlecha('nZ');
    this.desactivarFlechas('nA','aA','aZ','gA','gZ','eA','eZ');
  }
  apellidoAscendente(){
    this.admins=this.ordenarArray(this.admins,'apellidos');
    this.activarFlecha('aA');
    this.desactivarFlechas('nA','nZ','aZ','gA','gZ','eA','eZ');
  }
  apellidoDescendente(){
    this.admins=this.desordenarArray(this.admins,'apellidos');
    this.activarFlecha('aZ');
    this.desactivarFlechas('nA','nZ','aA','gA','gZ','eA','eZ');
  }
  grupoAscendente(){
    this.admins=this.ordenarArray(this.admins,'grupo');
    this.activarFlecha('gA');
    this.desactivarFlechas('nA','nZ','aZ','gZ','aA','eA','eZ');
  }
  grupoDescendente(){
    this.admins=this.desordenarArray(this.admins,'grupo');
    this.activarFlecha('gZ');
    this.desactivarFlechas('nA','nZ','aA','aZ','gA','eA','eZ');
  }
  emailAscendente(){
    this.admins=this.ordenarArray(this.admins,'correo');
    this.activarFlecha('eA');
    this.desactivarFlechas('nA','nZ','aZ','gZ','aA','gA','eZ');
  }
  emailDescendente(){
    this.admins=this.desordenarArray(this.admins,'correo');
    this.activarFlecha('eZ');
    this.desactivarFlechas('nA','nZ','aA','aZ','gA','gZ','eA');
  }
  

}
