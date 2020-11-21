import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aportes',
  templateUrl: './aportes.component.html',
  styleUrls: ['./aportes.component.css']
})
export class AportesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.ruta();
  }

  
  crearAporte(){
    document.getElementById('aportes').style.top='200px';
    document.getElementById('mainaportes').style.background='rgba(0, 0, 0, .4)';
  }
  cerrarAportes(){
    document.getElementById('aportes').style.top='-700px';
    document.getElementById('mainaportes').style.background='#fff';
  }
  ruta(){
    localStorage.setItem('ruta','Aportes')
  }


}
