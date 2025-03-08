import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-just-arrived',
  imports: [CommonModule,RouterLink],
  templateUrl: './just-arrived.component.html',
  styleUrl: './just-arrived.component.css'
})
export class JustArrivedComponent {
  constructor(private _api: ProductService) { }
  data: Product[] = [];

  ngOnInit(): void {
    this._api.getJustArrivedProducts().subscribe(
      (products) => {
        console.log('Just Arrived Products:', products);
        this.data = products;
      },
      (error) => {
        console.error('Error fetching latest products:', error);
      }
    );
  }
  
}
