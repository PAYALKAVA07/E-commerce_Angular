import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-best-selling',
  imports: [RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.css'
})
export class BestSellingComponent {
  constructor(private _api: ProductService) { }
  data: Product[] = [];

  ngOnInit(): void {
    this._api.getBestSellingProducts().subscribe(
      (products) => {
        this.data = products;
        console.log('Best Selling Products :',this.data)
      },
      (error) => {
        console.error('Error loading best selling products:', error);
      }
    );
  }
}
