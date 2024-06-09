import { Component, Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../serices/user.service';
import { signin,post } from '../../../datatype';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [TitleCasePipe,NgFor,NgIf],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user: signin | undefined
  allposts:any=[]
  newposts:any=[]
  ableLike=true
  friends:any = []
  Nopost = false

constructor(private activatedroute:ActivatedRoute){
  this.service.clickEvent.subscribe(()=>{
    this.getUser()
    this.getallpost()
  })
}

service = inject(UserService)


ngOnInit(){
  this.getUser()
  this.getallpost()
}


getUser(){
  console.log("user")
  let id = this.activatedroute.snapshot.paramMap.get("id")
  if(id){
  this.service.getUser(id).subscribe((res)=>{
    if(res){
      res.Password = ""
      this.user = res
      this.getPost()
    }
  })
  }
}

getPost(){
  let local = this.user
  let Username = this.user?.Name
    if (Username) {  
      this.service.getUserPosts(Username).subscribe((res)=>{
        let newres  = JSON.stringify(res)
        if(newres.length>2){
          this.allposts = res
        }else{
          this.Nopost = true
        }
      })
    }
}

likeAndDislike(id:number , post:post){
  if(post.likes == 0 || post.likes && id){
    this.newposts.forEach((element: any) => {
      if(id == element.id){
        
        if(post.likes == element.likes){
          this.like(id,post)
        }else{
          this.dislike(id,post)
        }

      }
    });
  }

}
like(id:number , post:post){
  if(post.likes == 0 || post.likes && id){
    post.likes++
    this.service.likes(id,post).subscribe((res)=>{
      if(res){
        this.ableLike = false
    
      }
    })
  }
}
dislike(id:number , post:post){
  if(post.likes == 0 || post.likes && id){
    post.likes--
    this.service.likes(id,post).subscribe((res)=>{
      if(res){
        this.ableLike = true

      }
    })

  }
}

getallpost(){
  this.service.allPosts().subscribe((res:post)=>{
    if(res){
      this.newposts=res
    }
  })
}


}
