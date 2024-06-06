import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { login, signin } from '../../../datatype';
import { UserService } from '../serices/user.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private service:UserService,private router:Router,){}

  ngOnInit(): void {
    this.chechUser()
  }

  active=true
  error = false;
  error1 = false;

  signup(data:signin){
    if(data.Email=="" || data.Password=="" || data.Name == "" || data.Image){
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 1500);
    }
    else{
    this.service.signinUser(data).subscribe((res:login)=>{
      let userDetails = JSON.stringify(res)
      if(userDetails.length){
        console.log(userDetails)
        localStorage.setItem('user',`${userDetails}`)
        this.router.navigate(["home-page"])   

      }
    })
  }
  }

  login(data:login){
    if(data.Email=="" || data.Password==""){
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 1500);
    }
    
    else{
      this.service.loginUser(data).subscribe((res)=>{
        let userDetails = JSON.stringify(res)
        if(userDetails.length>10){
        localStorage.setItem('user',`${userDetails}`)
        this.router.navigate(["home-page"])
        }else{
          this.error1 = true
          setTimeout(() => {
            this.error1 = false
          }, 1500)
        }

      })

    }
}

chechUser(){
  let local = localStorage.getItem('user')
  if(local){
  if(local.length>10){
    this.router.navigate(["home-page"])
  }}else{
    this.router.navigate([""])
  }


}

change(){
  if(this.active == true){
    this.active = false
  }else{
    this.active = true
  }
}
}



