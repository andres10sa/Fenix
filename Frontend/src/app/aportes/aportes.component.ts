import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import * as io from 'socket.io-client';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label,Color, BaseChartDirective,  } from 'ng2-charts';
import { ChartService } from '../service/chart.service';
import { aportes } from '../aportes';
import { Chart } from '../chart';
import  {jsPDF} from 'jspdf'
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-aportes',
  templateUrl: './aportes.component.html',
  styleUrls: ['./aportes.component.css']
})


export class AportesComponent implements OnInit {


  //////////////////////////////////////////////////////////////////////////////

  chartData: Chart[] = [];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  
  public pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];  
  public pieChartColors = [];
 
  public barChartLabels: any[] = [];
  public barChartData: any[] = [];
  public barChartType: ChartType = 'bar';
  public barChartColors = [];
  public barChartLegend = false;

  /////////////////////////////////////////////////////////


  displayedColumns: string[] = ['nombres', 'nroDocumento', 'celular','tipoAporte', 'totalAporte'];
  data: aportes[] = [];
  isLoadingResults = true;


  public aportes:object[];
  public idAportess:String[];
  public crear:boolean;
  public incompletos:boolean;
  public email:boolean;
  public existe:boolean;
  public id:string;


  constructor(private auth:AuthService,private router:Router, private api:ChartService) {
    this.incompletos=false;
    this.email=false;
    this.existe=false;
    
   }

  ngOnInit(): void {
    this.obtenerAportes();
 /*    this.getbarChart();  */
    this.getChartData();
    
 
  }

  datosAportes ={
    fecha: '',
    documento:'',
    nombres:'',
    apellidos:'',
    clase:'',
    fondo:'',
    idAportes:'',
    cantidadAporte:'',
    valorAporte:'',
    tipoAporte:'',
    totalAporte:''
  }


  agregarAportes(){
    document.getElementById('aportes').style.top='150px';
    document.getElementById('mainAportes').style.background='rgba(0, 0, 0, .4)';
    this.datosAportes={
      fecha: '',
      documento:'',
      nombres:'',
      apellidos:'',
      clase:'',
      fondo:'',
      idAportes:'',
      cantidadAporte:'',
      valorAporte:'',
      tipoAporte:'',
      totalAporte:''
    }
    this.crear=true;
  }
  ocultarFormulario(){
    document.getElementById('aportes').style.top='-700px';
    document.getElementById('mainAportes').style.background='#fff';
   

  }
  obtenerAportes(){
    this.auth.obtenerAportes().subscribe(
      (res)=>{

        this.aportes=res;
        let idAportess=[];
        res.forEach(ele=>idAportess.push(ele['idAportes']));
        this.idAportess=idAportess;
        
      },
      (err)=>console.log(err)
    )
  }
  eliminarAportes(id){
    this.auth.eliminarAportes(id).subscribe(
      (res)=>{
      
        this.obtenerAportes();
      },
      (err)=>console.log(err)
    )
  }

 
  guardarDatosAportes(id,feligres){
    document.getElementById('aportes').style.top='150px';
    document.getElementById('mainAportes').style.background='rgba(0, 0, 0, .4)';
    const {fecha, documento,nombres,apellidos,clase,fondo,idAportes,cantidadAporte,valorAporte,tipoAporte,totalAporte} = feligres
    this.datosAportes.fecha=fecha;
    this.datosAportes.documento=documento;
    this.datosAportes.nombres=nombres;
    this.datosAportes.apellidos=apellidos;
    this.datosAportes.clase=clase;
    this.datosAportes.fondo=fondo;
    this.datosAportes.idAportes=idAportes;
    this.datosAportes.cantidadAporte=cantidadAporte;
    this.datosAportes.valorAporte=valorAporte;
    this.datosAportes.tipoAporte=tipoAporte;
    this.datosAportes.totalAporte=totalAporte;
    this.crear=false;
    this.id=id;


  }

  editarAportes(e){
    e.preventDefault();
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {fecha, documento,nombres,apellidos,clase,fondo,idAportes,cantidadAporte,valorAporte,tipoAporte,totalAporte} = this.datosAportes;

    this.auth.editarAportes(this.id,this.datosAportes).subscribe(
      (res)=>{
  /*       console.log(res); */
        this.obtenerAportes();
        this.limpiarFormulario();
      },
      (err)=>console.log(err)
    )
  }

  limpiarFormulario(){
    return this.datosAportes={
      fecha: '',
      documento:'',
      nombres:'',
      apellidos:'',
      clase:'',
      fondo:'',
      idAportes:'',
      cantidadAporte:'',
      valorAporte:'',
      tipoAporte:'',
      totalAporte:''
    }
  }

  //postear feligres
  postearAportes(e){
    e.preventDefault();
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const {fecha, documento,nombres,apellidos,clase,fondo,idAportes,cantidadAporte,valorAporte,tipoAporte,totalAporte} = this.datosAportes;

  
    this.auth.crearAportes(this.datosAportes).subscribe(
      (res)=>{
        this.obtenerAportes();
        this.limpiarFormulario();
      },
      (err)=>console.log(err)
    )
  }

  getChartData() {
    this.api.getChart().subscribe((res: any) => {
     /*  console.log(res); */
      this.chartData = res;
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.barChartData = [];
      this.pieChartColors = [];
      this.barChartLabels = [];
      const backgrounds = [];
      const barbackgrounds = [];
      this.chartData.forEach((ch, idx) => {
        this.pieChartLabels.push(ch.tipoAporte);
        this.barChartLabels.push(ch.nombres);
        this.pieChartData.push(ch.valorAporte);
        this.barChartData.push(ch.cantidadAporte);
       backgrounds.push(`rgba(${12 + (idx * 1)}, ${89 - (idx * 20)}, ${161 + (idx * 10)}, 0.3)`);
       barbackgrounds.push(`rgba(${71 + (idx * 1)}, ${205 - (idx * 20)}, ${69 + (idx * 10)}, 0.3)`);
      });
      this.pieChartColors = [
        {
          backgroundColor: backgrounds
        }
      ];

      this.barChartColors = [
        {
          backgroundColor: barbackgrounds
        }
      ];


    }, err => {
      console.log(err);
    });


  }

  generarPDFAportes() {
    // Extraemos el
    const tablaAportes = document.getElementById('t-aportes');
    const pdfAportes = new jsPDF('l', 'mm', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(tablaAportes, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 30;
      const bufferY = (-50);
      const imgProps = (pdfAportes as any).getImageProperties(img);
      const pdfWidth = pdfAportes.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdfAportes.text("Aportes",10,15);
      pdfAportes.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return pdfAportes;
    }).then((pdfAportesResult) => {
      pdfAportesResult.save(`${new Date().toISOString()}_aportes.pdf`);
    });
  }

}
