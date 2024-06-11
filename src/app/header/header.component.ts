import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, destroyPlatform, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../serices/user.service';
import { friends } from '../../../datatype';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, RouterLink, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  formInput = ""
  Username = ""
  image = ""
  userid = ""
  users: any = []
  result: any = []
  profileid:any = ""
  show = false

  router = inject(Router)
  service = inject(UserService)

  constructor(){
    this.service.clickEvent.subscribe(()=>{
      this.formInput=""
    })
  }

  ngOnInit(): void {
    this.getUser()
    this.getAllUsers()
  }

  getUser() {
    let local = localStorage.getItem("user");
    if (local?.length) {
      let info = local && JSON.parse(local)
      this.Username = info[0].Name
      this.image = info[0].Image
      this.userid = info[0].id
    }
  }

  getAllUsers() {
    this.service.getusers().subscribe((res: any) => {
      if (res) {
        let local = localStorage.getItem("user")
        let user = local && JSON.parse(local)

        res.forEach((element: any) => {
          if (element.Email != user[0].Email) {
            const newEle = {
              Name: "",
              Image: "",
              id: "",
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

  search(data: any) {
    if (data.Name != "") {
      this.show = true
      let name = data.Name.toLocaleLowerCase()
      this.result = []
      if (name.length) {
        this.users.forEach((ele: friends) => {
          let user = ele.Name.toLocaleLowerCase()
          if (user.includes(name)) {
            this.result.push(ele)
            this.show = true
          } else if (this.result.length == 0) {
            this.show = false
          }
        })
      }

    } else {
      this.show = false
    }

  }


  profile(userid: string) {
    if(userid != ""){
      this.service.getUser(userid).subscribe((res)=>{
        if(res){
          this.formInput = res.Name
          this.profileid = res &&  res.id
          this.show = false

        }
       
        
      })
    }
  }

  navigate(){
    this.clickevent()
    this.router.navigate([`user-profile/${this.profileid}`])

  }

  clickevent(){
    this.service.clickEvent.next('')
  }
    

}
