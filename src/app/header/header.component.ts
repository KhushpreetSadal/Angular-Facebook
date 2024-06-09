import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../serices/user.service';
import { friends } from '../../../datatype';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,TitleCasePipe,RouterLink,NgFor,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
Username = ""
image = ""
userid = ""
users:any=[]
result:any = []
show = false

router = inject(Router)
service = inject(UserService)

  ngOnInit(): void {
    this.getUser()
    this.getAllUsers()
  }

  getUser(){
    let local = localStorage.getItem("user");
    if(local?.length){
      let info = local && JSON.parse(local)
      this.Username = info[0].Name
      this.image = info[0].Image
      this.userid = info[0].id
    }
  }

  getAllUsers(){
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
            this.users.push(newEle)
          }
        })
      }
    })
  }

  search(data:any){
    if(data.Name != "" ){
      this.show = true
    let name = data.Name.toLocaleLowerCase()
    this.result = []
    if(data){
      this.users.forEach((ele:friends)=>{
        let user = ele.Name.toLocaleLowerCase()
        if(user.includes(name)){
          console.log(ele)
          if(ele.Name.length){
            console.log("if")
            this.result.push(ele)
          }else{
            console.log("else")
            this.show = true
          }
        }
      })
    }

  }else{
    this.show = false
  }
   
  }


profile(userid:string){
 this.router.navigate([`user-profile/${userid}`])
 this.show = false
}


}
