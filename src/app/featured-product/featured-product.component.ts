import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-product',
  imports: [CommonModule,RouterLink],
  templateUrl: './featured-product.component.html',
  styleUrl: './featured-product.component.css'
})
export class FeaturedProductComponent {
  constructor(private _api: ProductService) { }
    data: Product[] = [];
  
    ngOnInit(): void {
      this._api.getFeaturedProducts().subscribe(
        (products) => {
          this.data = products;
          console.log('Featured Products :',this.data)
        },
        (error) => {
          console.error('Error loading Featured products:', error);
        }
      );
    }
}
