import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3200/products/bestselling';

  constructor(private _http:HttpClient) { }

  // getBestSellingProducts() {
  //   return this._http.get(this.apiUrl);
  // }

  getBestSellingProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.apiUrl);
  }
}
