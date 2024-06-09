import { EventEmitter, Injectable, inject } from '@angular/core';
import { Product, friends, login, post, signin, video } from '../../../datatype';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  clickEvent = new Subject()


  // user services

  signinUser(data:signin){
    return this.http.post<login>(`http://localhost:3000/user`,data);
  }

  loginUser(data:login){
    return this.http.get(`http://localhost:3000/user?Email=${data.Email}&Password=${data.Password}`)
  }

  getusers(){
    return this.http.get('http://localhost:3000/user/')
    }
  

  getUser(id:string){
    return this.http.get<signin>(`http://localhost:3000/user/${id}`)
  }


  // post services

  newPost(data:post){
    return this.http.post("http://localhost:3000/posts",data)
  }

  allPosts(){
    return this.http.get<post>("http://localhost:3000/posts")

  }

  likes(id:number,data:post){
    return this.http.patch(`http://localhost:3000/posts/${id}`,data)

  }

  getUserPosts(name:string){
    return this.http.get(`http://localhost:3000/posts?username=${name}`)
  }

  deleteUserPost(id:number){
   return this.http.delete(`http://localhost:3000/posts/${id}`)

  }
  
  postDetails(id:number){
    return this.http.get<post>(`http://localhost:3000/posts/${id}`)
  }

  editPost(data:post){
    return this.http.patch(`http://localhost:3000/posts/${data.id}`,data)

  }

 
  // video services

  getVideos(){
    return this.http.get("http://localhost:3000/videos")

  }

  likeVideo(id:string,data:video){
    return this.http.patch(`http://localhost:3000/videos/${id}`,data)
  }

  newVideo(data:video){
    return this.http.post("http://localhost:3000/videos",data)

  }

  getUserVideos(name:string){
    return this.http.get(`http://localhost:3000/videos?username=${name}`)
  }

  deleteUserVideo(id:number){
    return this.http.delete(`http://localhost:3000/videos/${id}`)
 
   }
    
  VideoDetails(id:number){
    return this.http.get<video>(`http://localhost:3000/videos/${id}`)
  }

  
  editVideo(data:video){
    return this.http.patch(`http://localhost:3000/videos/${data.id}`,data)

  }

  // friends services
  
  addFriend(data:friends){
    return this.http.post("http://localhost:3000/friends/",data)
  }

  getFriends(name:string){
    return this.http.get<friends>(`http://localhost:3000/friends?user=${name}`)
  }
  
  removeFriend(id:string){
    return this.http.delete(`http://localhost:3000/friends/${id}`)
  }

  // marketplace services

  addProduct(data:Product){
    return this.http.post("http://localhost:3000/marketplace",data)
  }
  getAllProducts(){
    return this.http.get("http://localhost:3000/marketplace")     
  }

}
