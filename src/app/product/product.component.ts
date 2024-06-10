import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../serices/user.service';
import { Product } from '../../../datatype';
import { CurrencyPipe, NgFor, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor,CurrencyPipe,TitleCasePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  activatedroute = inject(ActivatedRoute)
  service = inject(UserService)

  product:any=[]

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    let id = this.activatedroute.snapshot.paramMap.get("id")
    if(id?.length){
      this.service.getProduct(id).subscribe((res)=>{
        if(res){
          this.product.push(res)
          console.log(this.product)
        }
      })
    }
  }

}
