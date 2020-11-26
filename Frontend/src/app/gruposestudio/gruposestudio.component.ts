import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import  {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';

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

  constructor(public auth:AuthService,private router:Router) { 
    this.cel=false;
    this.sie=false;
    this.dom=false;
    this.res=false;
  }

  ngOnInit(): void {
   this.obtenerIntegrantes();
   this.ruta();
  }
  ruta(){
    // let url = this.router.url.slice(1)
    localStorage.setItem('ruta','Grupos de estudio')
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
  generarPDFge() {
    // Extraemos el
    const tablaGrupoEstudio = document.getElementById('grupoEstudio');

    const pdfGE = new jsPDF('p', 'pt', 'a4');

    const options = {
      background: 'white',
      scale: 2
    };
    html2canvas(tablaGrupoEstudio, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 150;
      const imgProps = (pdfGE as any).getImageProperties(img);
      const pdfWidth = pdfGE.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdfGE.text("Grupos de estudio",10,15);
      pdfGE.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return pdfGE;
    }).then((pdfGEResult) => {
      pdfGEResult.save(`${new Date().toISOString()}_GrupoEstudio.pdf`);
    });
  }

}
