import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public current:string;

  constructor(public auth:AuthService,private router:Router) {
      this.current='';
   }

  ngOnInit(): void {
    
  }

 

}
