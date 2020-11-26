import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import  {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';

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
  generarPDFMinisterio() {
    // Extraemos el Id
    const tablaMinisterios = document.getElementById('t-ministerios');
   
    const pdfMinisterios = new jsPDF('l', 'pt', 'a4');
    
    const options = {
      background: 'white',
      scale: 2,
      
    };
    html2canvas(tablaMinisterios, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 150;
      const imgProps = (pdfMinisterios as any).getImageProperties(img);
      const pdfWidth = pdfMinisterios.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdfMinisterios.text("Ministerios",10,15);
      pdfMinisterios.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return pdfMinisterios;
    }).then((pdfMinisteriosResult) => {
      pdfMinisteriosResult.save(`${new Date().toISOString()}_Ministerios.pdf`);
    });
   
  }
}
