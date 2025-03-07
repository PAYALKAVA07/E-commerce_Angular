import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:3200/auth/login'

  constructor(private _http:HttpClient) { }

  login(user_email:any,user_password:any){
    console.log("login post")
    return this._http.post(this.apiUrl, {user_email,user_password});
  }
}
