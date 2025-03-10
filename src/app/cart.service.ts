import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:3200/cart';

  constructor(private _http:HttpClient) { }

  // getAll() {
  //     return this._http.get(this.apiUrl, { headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) });
  // }

  getAll(productId: string) {
    return this._http.get(`${this.apiUrl}/product/${productId}`, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) 
    });
  } 

  insertProduct(productId: string, quantity: number) {
    return this._http.post(`${this.apiUrl}/add`, { productId, quantity }, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) 
    });
  }

  // Update product quantity in cart
  updateProductQuantity(productId: string, quantity: number) {
    return this._http.patch(`${this.apiUrl}/update`, { productId, quantity }, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) 
    });
  }

  // Delete a product from the cart
  removeProduct(productId: string) {
    return this._http.delete(`${this.apiUrl}/remove/${productId}`, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) 
    });
  }

  // Clear the entire cart
  clearCart() {
    return this._http.delete(`${this.apiUrl}/clear`, { 
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`) 
    });
  }
}