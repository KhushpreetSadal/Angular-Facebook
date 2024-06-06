import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../serices/user.service';
import { post } from '../../../datatype';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editpost',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './editpost.component.html',
  styleUrl: './editpost.component.css'
})
export class EditpostComponent {
  posts:any = []
  id = 0
  select=""
  show = true

  constructor(private router:Router,private activated_route:ActivatedRoute,private service:UserService){}

 ngOnInit(): void {
  this.getProductDetail()
  this.showPost()

 } 

 showPost(){
  if(this.select.includes("img")){
    this.getPost()
    this.show = true
  }else{
    this.getVideo()
    this.show = false
  }
 }

 
 getProductDetail(){
  let id = this.activated_route.snapshot.paramMap.get("id")
  let arr = id && Array.from(id)
  if(arr){
    arr.forEach((element:any) => {
      let ele = parseInt(element)
      if(!Number.isNaN(ele)){
        this.id = ele
        
      }else{
        this.select = this.select+element

      }
      
    });
    
  }
 }

savePost(data:any){
  if(this.select.includes("img")){
  this.posts.title = data.title
  this.posts.image = data.image

  this.service.editPost(this.posts).subscribe((res)=>{
    if(res){
      this.router.navigate(['all-post/image'])
      alert("Post-Updated")
    }
  })
}else{

  this.posts.title = data.title
  this.posts.video = data.video

  this.service.editVideo(this.posts).subscribe((res)=>{
    if(res){
      this.router.navigate(['all-post/video'])
      alert("Post-Updated")
    }
  })



}


}

getPost(){
  this.id && this.service.postDetails(this.id).subscribe((res)=>{
    if(res){
      this.posts = res
    }
  })
}

getVideo(){
  this.id && this.service.VideoDetails(this.id).subscribe((res)=>{
    if(res){
      this.posts = res
      console.log(res)
    }
  })
}
}
