import { Component, Inject, inject } from '@angular/core';
import { UserService } from '../serices/user.service';
import { Product } from '../../../datatype';
import { CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [NgFor ,CurrencyPipe,TitleCasePipe,NgIf],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent {

  service = inject(UserService)
  router = inject(Router)
  showHeader = inject(AppComponent)

  
  
  products:Product|any = []
  show = false

  ngOnInit(): void {
    this.getProducts()
    
  }

  getProducts(){
    this.service.getAllProducts().subscribe((res)=>{
      if(res){
        this.products = res
        this.show = false
      }
    })
  }

  showProduct(id:string){
    if(id !=""){
      this.router.navigate([`product/${id}`])
    }
  }

  myProducts(){
    let local = localStorage.getItem("user")
    let user = local && JSON.parse(local)
    if(user.length){
      this.service.myProducts(user[0].Name).subscribe((res)=>{
        if(res){
          this.products = res
          this.show = true

        }
      })
    }  
  }


  addProduct(){
    this.router.navigate(["addProduct"])
  }

  logout() {
    let local = localStorage.getItem("user")
    let user = local && JSON.parse(local)
    if (user.length) {
      localStorage.removeItem('user');
      this.showHeader.ngOnInit();
      this.router.navigate([""]);
    }

  }

}
