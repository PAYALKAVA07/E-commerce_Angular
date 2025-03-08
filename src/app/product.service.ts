import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:3200/products';

  constructor(private _http:HttpClient) { }


  getAll(){
    return this._http.get(this.apiUrl, {headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)});
  }

  getBestSellingProducts(): Observable<Product[]> {
    return this.getAll().pipe(
      map((products: any) => {
        if (!Array.isArray(products)) {
          console.error('API Response is not an array');
          return [];
        }
        return products
          .filter(product => product.total_ratings > 0) 
          .sort((a, b) => b.total_ratings - a.total_ratings) 
          .map(product => ({
            ...product,
            stars: this.generateStars(product.average_rating) 
          }))
          .slice(0, 10); 
      })
    );
  }

  getJustArrivedProducts(): Observable<any[]> {
    return this.getAll().pipe(
      map((products: any) => {
        if (!Array.isArray(products)) {
          console.error('API Response is not an array');
          return [];
        }
        return products
          .sort((a, b) => new Date(b.product_created_at).getTime() - new Date(a.product_created_at).getTime()) 
          .map(product => ({
            ...product,
            stars: this.generateStars(product.average_rating) 
          }))
          .slice(0, 10); 
      })
    );
  }

  getFeaturedProducts(): Observable<any[]> {
    return this.getAll().pipe(
      map((products: any) => {
        if (!Array.isArray(products)) {
          console.error('API Response is not an array');
          return [];
        }
        const bestSelling = products
          .filter(product => product.total_ratings > 0)
          .sort((a, b) => b.total_ratings - a.total_ratings)
          .slice(0, 10);
  
        const justArrived = products
          .sort((a, b) => new Date(b.product_created_at).getTime() - new Date(a.product_created_at).getTime())
          .slice(0, 10);
  
        const uniqueProducts = new Map<string, Product>();
        [...bestSelling, ...justArrived].forEach(product => {
          uniqueProducts.set(product._id, product);
        });
  
        return Array.from(uniqueProducts.values())
          .slice(0, 20)
          .map(product => ({
            ...product,
            stars: this.generateStars(product.average_rating)
          }));
      })
    );
  }

  // function to generate star ratings
  generateStars(rating: number): number[] {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar; 
  
    return [
      ...Array(fullStars).fill(1), 
      ...Array(halfStar).fill(0.5), 
      ...Array(emptyStars).fill(0) 
    ];
  }
  
}
