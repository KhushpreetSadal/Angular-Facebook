import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../datatype';
import { UserService } from '../serices/user.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {
  error = false

  service = inject(UserService)
  router = inject(Router)


  submit(data:Product){
    if(data.Description != "" && data.Image != "" && data.Price != "" ){
      
      let local = localStorage.getItem("user")
      let user = local && JSON.parse(local)
      data.Name = user[0].Name
      data.userImage = user[0].Image
      console.log(user[0].Email)
      this.service.addProduct(data).subscribe((res)=>{
        if(res){
          alert("Product Added")
          this.router.navigate(["market"])

        }
      })
      
    }else{
      this.error = true
      setTimeout(() => {
        this.error = false
      }, 1500);

    }

  }


}
