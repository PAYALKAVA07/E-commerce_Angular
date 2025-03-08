import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  constructor(private _http:HttpClient) { }

  apiUrl="http://localhost:3200/category/";

  getAllCategory(){
    return this._http.get(this.apiUrl,{headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)});
  }
}
