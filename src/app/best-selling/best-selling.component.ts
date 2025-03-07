import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { RouterLink } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-best-selling',
  imports: [RouterLink,CommonModule,CurrencyPipe],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.css'
})
export class BestSellingComponent {
  constructor(private _api: ProductService) { }
  data: Product[] = [];
  // ngOnInit() {
  //   this._api.getBestSellingProducts().subscribe((res: any) => {
  //     this.data = res;
  //   });
  // }

  ngOnInit(): void {
    this._api.getBestSellingProducts().subscribe((res: any) => {
      console.log("API response:", res);
      // Adjust the following line based on your API's response structure.
      // For example, if the response is an object with a "products" property:
      this.data = res.bestSellingProducts      ;
      console.log(this.data)
      // If the API actually returns an array, simply use:
      // this.data = res;
    }, err => {
      console.error("Error loading best selling products:", err);
    });
  }
}
