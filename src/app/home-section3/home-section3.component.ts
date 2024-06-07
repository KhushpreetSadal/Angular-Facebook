import { NgFor, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../serices/user.service';
import { friends} from '../../../datatype';

@Component({
  selector: 'app-home-section3',
  standalone: true,
  imports: [TitleCasePipe,NgFor],
  templateUrl: './home-section3.component.html',
  styleUrl: './home-section3.component.css'
})
export class HomeSection3Component {

  friends:any|friends = []

  ngOnInit(): void {
  this.getusers()
  this.getFriends()
    
  }

  constructor(private router:Router, private service:UserService){}


  showprofile(userid:string){
    this.router.navigate([`user-profile/${userid}`])

  }

  getusers(){
    this.service.getusers().subscribe((res:any)=>{
     if(res){
       let loacl = localStorage.getItem("user")
       let user = loacl && JSON.parse(loacl)

       res.forEach((element:any) => {
         if(element.Email != user[0].Email){
           const newEle = {
            Name:"",
            Image:"",
            id:"",
           }
           newEle.Image = element.Image
           newEle.Name = element.Name
           newEle.id = element.id
           this.friends.push(newEle)
         }
       })
     }
    })
   }


   addFriend(data:friends){
    let local = localStorage.getItem("user")
    let user = local&& JSON.parse(local)
    if(user.length){
      data.user = user[0].Email
      this.service.addFriend(data).subscribe((res:any)=>{
        if(res){
          this.getFriends()
          alert("Friend Added Sucessfully")
        }
      })

    }   
   }

   getFriends(){
    let local = localStorage.getItem("user")
  let user  = local &&  JSON.parse(local)
  if(user){
    this.service.getFriends(user[0].Email).subscribe((res:any)=>{
      if(res.length){
      for (let i = 0; i < res.length; i++) {
       let list = this.friends.filter((user:friends) => user.Name != res[i].Name && user.id != res[i].id);
       this.friends = list    
      }
      
    }
    })
   }
  }


}
