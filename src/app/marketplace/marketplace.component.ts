import { Component, inject } from '@angular/core';
import { UserService } from '../serices/user.service';
import { Product } from '../../../datatype';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [NgFor],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent {

  products:Product|any = []

  service = inject(UserService)

  ngOnInit(): void {
    this.getProducts()
    
  }

  getProducts(){
    this.service.getAllProducts().subscribe((res)=>{
      if(res){
        this.products = res
      }
    })
  }

}
