import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { PostpageComponent } from '../postpage/postpage.component';


@Component({
  selector: 'app-home-section1',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './home-section1.component.html',
  styleUrl: './home-section1.component.css'
})
export class HomeSection1Component {

  Username = '';
  image = '';


  constructor(private showHeadre: AppComponent, private router: Router, private acvtivatedroute: ActivatedRoute) { }

  url = this.acvtivatedroute.snapshot.paramMap.get("url")

  logout() {
    let local = localStorage.getItem("user")
    let user = local && JSON.parse(local)
    if (user.length) {
      localStorage.removeItem('user');
      this.showHeadre.ngOnInit();
      this.router.navigate([""]);
    }

  }

  GetUserDetails() {
    let local = localStorage.getItem('user');
    if (local?.length) {
      let info = local && JSON.parse(local);
      this.Username = info[0].Name;
      this.image = info[0].Image;
    }
  }

  creatPost(data: Boolean) {
    let url = this.acvtivatedroute.snapshot.url[0].path

    if (url.includes("home")) {
      if (data == true) {
        this.router.navigate(["new-post/image"])

      } else {
        this.router.navigate(["all-post/image"])

      }
    }else{
      if (data == true) {
        this.router.navigate(["new-post/video"])

      } else {
        this.router.navigate(["all-post/video"])

      }
    }
  }

}
