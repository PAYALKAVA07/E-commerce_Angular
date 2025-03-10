import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-most-popular',
  imports: [CommonModule,RouterLink],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.css'
})
export class MostPopularComponent {
  constructor(private _api: ProductService) { }
    data: Product[] = [];
  
    ngOnInit(): void {
      this._api.getMostPopularProducts().subscribe(
        (products) => {
          this.data = products;
          console.log('Most Popular Products :',this.data)
        },
        (error) => {
          console.error('Error loading best selling products:', error);
        }
      );
    }
}
