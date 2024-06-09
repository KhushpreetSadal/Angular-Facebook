import { Component } from '@angular/core';
import { UserService } from '../serices/user.service';
import { friends } from '../../../datatype';
import { NgFor, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [NgFor,TitleCasePipe],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {

constructor(private service:UserService,private router:Router){}

Friends:friends|any = []

ngOnInit(): void {
this.getFriends()
  
}


getFriends(){
  let local = localStorage.getItem("user")
  let user  = local &&  JSON.parse(local)
  if(user){
  this.service.getFriends(user[0].Email).subscribe((res)=>{
    if(res){
      this.Friends = res
    }
  })
}
}

remove(data:string){
  this.service.removeFriend(data).subscribe((res)=>{
    if(res){
      this.getFriends()
      alert("Removed Successfully")
    }
  })

}


showprofile(userid:string){
  this.router.navigate([`user-profile/${userid}`])

}

}
