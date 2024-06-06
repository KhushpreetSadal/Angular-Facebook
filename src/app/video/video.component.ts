import { Component } from '@angular/core';
import { HomeSection1Component } from '../home-section1/home-section1.component';
import { HomeSection3Component } from '../home-section3/home-section3.component';
import { NgFor, TitleCasePipe } from '@angular/common';
import { UserService } from '../serices/user.service';
import { video } from '../../../datatype';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [HomeSection1Component, HomeSection3Component, NgFor, TitleCasePipe],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  allvideos: any = []
  Username = '';
  image = '';
  newvideos: any = []
  ableLike = true

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.GetUserDetails()
    this.getAllVideos()
    this.getVideos()



  }

  GetUserDetails() {
    let local = localStorage.getItem('user');
    if (local?.length) {
      let info = local && JSON.parse(local);
      this.Username = info[0].Name;
      this.image = info[0].Image;
    }
  }

  getAllVideos() {
    this.service.getVideos().subscribe((res => {
      if (res) {
        this.allvideos = res
      }
    }))
  }

  getVideos() {
    this.service.getVideos().subscribe((res => {
      if (res) {
        this.newvideos= res
      }
    }))

  }


  likeAndDislike(id: string, video: video) {
    if (video.likes == 0 || video.likes && id) {
      this.newvideos.forEach((element: any) => {
        if (id == element.id) {

          if (video.likes == element.likes) {
            this.like(id,video)
          } else {
            this.dislike(id, video)
          }

        }
      });
    }

  }

  like(id:string,video:video){
    if(video.likes == 0 || video.likes && id){
      video.likes++
      this.service.likeVideo(id,video).subscribe((res)=>{
        if(res){
          this.ableLike = false
      
        }
      })
    }

  }


  dislike(id:string , video:video){
    if(video.likes == 0 || video.likes && id){
      video.likes--
      this.service.likeVideo(id,video).subscribe((res)=>{
        if(res){
          this.ableLike = true
  
        }
      })

    }
  }
}
