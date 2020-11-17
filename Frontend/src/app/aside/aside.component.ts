import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    localStorage.setItem('sesion','false');
    localStorage.removeItem('token');
  }

}
