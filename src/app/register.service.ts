import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl = 'http://localhost:3200/auth/register';

  constructor(private _http: HttpClient) { }
  
  register(user_firstName: any, user_lastName: any, user_email: any, user_contact: any, user_password: any, user_confirmpassword: any) {
    console.log("regiser post")
    return this._http.post(this.apiUrl, { user_firstName, user_lastName, user_email, user_contact, user_password, user_confirmpassword });
  }
}
