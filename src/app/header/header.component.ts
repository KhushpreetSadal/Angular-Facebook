import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,TitleCasePipe,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
Username = ""
image = ""
  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    let local = localStorage.getItem("user");
    if(local?.length){
      let info = local && JSON.parse(local)
      this.Username = info[0].Name
      this.image = info[0].Image
    }
  }

  search(data:any){

  }
}
