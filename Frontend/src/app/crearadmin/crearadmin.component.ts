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
  public incompletos:boolean;//Verificia si todos los campos están llenos
  public contra:boolean;//Verifica si las contraseñas son iguales
  public email:boolean;//Verifica si el correo es valido
  public existe:boolean;//Verifica si el usuario existe

  constructor(private auth:AuthService,private router:Router) { 

    this.incompletos=false;
    this.contra=false;
    this.email=false;
    this.existe=false;
  
  }

  ngOnInit(): void {
    this.obtenerAdmins();
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
        this.admins=res;
        let correos=[];
        res.forEach(ele=>correos.push(ele['correo']));
        this.correos=correos;
      },
      (err)=>console.log(err)
    )
    
  }
  //Eliminar admin
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
}
