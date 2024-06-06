import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, HeaderComponent,NgIf]
})
export class AppComponent {
  ngOnInit(): void {
    this.checkUser()
  }
  title = 'facebook';
  show = false
  
  checkUser(){
    let local = localStorage.getItem('user')
    if(local){
    if(local.length>10){
      this.show = true

    }}else{
      this.show = false
    }
  }
  
}
