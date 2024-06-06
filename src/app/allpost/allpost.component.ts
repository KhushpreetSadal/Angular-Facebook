import { Component} from '@angular/core';
import { UserService } from '../serices/user.service';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allpost',
  standalone: true,
  imports: [NgFor,TitleCasePipe,NgIf],
  templateUrl: './allpost.component.html',
  styleUrl: './allpost.component.css'
})

export class AllpostComponent {

allposts:any = []
allvideos:any = []
show = true
update = false

constructor(private service : UserService, private router:Router,private activatedroute:ActivatedRoute){}

ngOnInit(): void {
  let url = this.activatedroute.snapshot.paramMap.get("id")
  if(url?.includes("image")){
    this.getPost()
    this.show = true
  }else{
    this.getVideo()
    this.show = false
  }
}


getPost(){
  let local = localStorage.getItem('user');
    if (local?.length) {
      let info = local && JSON.parse(local);
      let Username = info[0].Name;
      this.service.getUserPosts(Username).subscribe((res)=>{
        if(res){
          this.allposts = res
        }
      })
    }
}


del(id:number){
  this.service.deleteUserPost(id).subscribe((res)=>{
    if(res){
      this.getPost()
    }
  })
}


edit(id:number){
  this.router.navigate([`edit-post/img${id}`])
}

postUpdated(){
  this.update = true
  setTimeout(() => {
    this.update = false
  }, 1500);
}



getVideo(){
  let local = localStorage.getItem('user');
  if (local?.length) {
    let info = local && JSON.parse(local);
    let Username = info[0].Name;
    this.service.getUserVideos(Username).subscribe((res)=>{
      if(res){
        this.allvideos = res
      }
    })
  }
}


editVideo(id:number){
  
  this.router.navigate([`edit-post/vid${id}`])
  
}
delvideo(id:number){
  this.service.deleteUserVideo(id).subscribe((res)=>{
    if(res){
      this.getVideo()
    }
  })
}

}


