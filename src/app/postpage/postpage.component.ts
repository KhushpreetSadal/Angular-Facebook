import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { post } from '../../../datatype';
import { UserService } from '../serices/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn:"root"
})

@Component({
  selector: 'app-postpage',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './postpage.component.html',
  styleUrl: './postpage.component.css'
})
export class PostpageComponent {
  
  show = true
  showerror = false

  constructor(private service:UserService,private router:Router,private activatedroute:ActivatedRoute){}


ngOnInit(): void {
  this.showPost()
  
}

showPost(){
  let data = this.activatedroute.snapshot.paramMap.get("id")
  if(data?.includes("image")){
    this.show = true
  }else{
    this.show = false
  }

}



  creatNewPost(data:post){
    if(data.image == "" || data.title == ""){
      this.showerror = true

    }else{
      let user = localStorage.getItem('user')
      let userDetail = user && JSON.parse(user)
      data.userimage = userDetail[0].Image
      data.username = userDetail[0].Name
      data.likes = 0
      this.service.newPost(data).subscribe((res)=>{
        if(res){
          this.router.navigate([''])
        }
      })
    }
  }


  creatNewVideo(data:any){
    if(data.video == "" || data.title == ""){
      this.showerror = true

    }else{
      let user = localStorage.getItem('user')
      let userDetail = user && JSON.parse(user)
      data.userimage = userDetail[0].Image
      data.username = userDetail[0].Name
      data.likes = 0
      this.service.newVideo(data).subscribe((res)=>{
        if(res){
          this.router.navigate(['video'])

        }
      })
    }

  }





}
