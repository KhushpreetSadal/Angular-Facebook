import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app.component';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { UserService } from '../serices/user.service';
import { post } from '../../../datatype';
import { HomeSection1Component } from '../home-section1/home-section1.component';
import { HomeSection3Component } from '../home-section3/home-section3.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HeaderComponent, RouterOutlet, TitleCasePipe, RouterLink,NgFor,NgIf,HomeSection1Component,HomeSection3Component],
})
export class HomeComponent {
  Username = '';
  image = '';
  allposts:any=[]
  newposts:any=[]
  ableLike=true
  

  constructor(private showHeadre: AppComponent, private router: Router, private service:UserService) {}

  ngOnInit(): void {
    this.showHeadre.ngOnInit();
    this.GetUserDetails();
    this.Posts()
    this.getallpost()

  }

  GetUserDetails() {
    let local = localStorage.getItem('user');
    if (local?.length) {
      let info = local && JSON.parse(local);
      this.Username = info[0].Name;
      this.image = info[0].Image;
    }
  }


  getallpost(){
    this.service.allPosts().subscribe((res:post)=>{
      if(res){
        this.newposts=res
      }
    })
  }



  Posts(){
    this.service.allPosts().subscribe((res:post)=>{
      if(res){
        this.allposts=res
      }
    })
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



}
