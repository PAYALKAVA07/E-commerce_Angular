import { Component, NgModule } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ApiCategoryService } from '../api-category.service';
import { Category } from '../category';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-products',
  imports: [CommonModule,FormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  Categories: Category[] = [];
  wishlistProductIds: string[] = [];
  category_id: string | null = null;
  quantity: number = 1;

  selectedCategory: string = 'all';
  minPrice :number=5;
  maxPrice: number = 1000;
  maxPriceLimit: number = 1000;
  sortBy: string = 'none';

  constructor(
    private _activeRoute: ActivatedRoute,
    private _apiProduct: ProductService,
    private _apiCategory: ApiCategoryService,
    private _apiCart: CartService,
    private _apiWishlist: WishlistService
  ) {}

  // ngOnInit(): void {
  //   this._activeRoute.params.subscribe(params => {
  //     this.category_id = params['id'];
  //     this.loadWishlist();
  //     this.getCategories();

  //     if (this.category_id) {
  //       this.getProductsByCategory(this.category_id);
  //     } else {
  //       this.getAllProduct();
  //     }
  //   });
  // }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.category_id = params['id'];
  
      this.loadWishlist();
      this.loadCategories();
      this.getAllProduct();
    });
  }

  loadCategories() {
    this._apiCategory.getAllCategory().subscribe((res: any) => {
      this.Categories = res;
    });
  }
  getAllProduct() {
    this._apiProduct.getAll().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = res;
    });
  }

  getCategories(): void {
    this._apiCategory.getAllCategory().subscribe((res: any) => {
      this.Categories = res;
    });
  }

  loadWishlist(): void {
    this._apiWishlist.getAll().subscribe((res: any) => {
      if (res.products) {
        this.wishlistProductIds = res.products.map((p: any) => p.product_id._id);
      }
    });
  }

  addToCart(id: any): void {
    this._apiCart.insertProduct(id, this.quantity).subscribe(() => {
      console.log('cart...........')
      Swal.fire({
        title: 'Product Added to Cart!',
        text: 'Your item has been added successfully.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  isInWishlist(id: any): boolean {
    return this.wishlistProductIds.includes(id);
  }

  addToWishlist(id: any): void {
    this._apiWishlist.insert(id).subscribe((res: any) => {
      if (res.status) {
        if (!this.isInWishlist(id)) {
          this.wishlistProductIds.push(id);
        }
      } else {
        this.wishlistProductIds = this.wishlistProductIds.filter(pid => pid !== id);
      }

      Swal.fire({
        title: res.message,
        text: 'Your wishlist has been updated successfully.',
        icon: res.status ? 'success' : 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    });
  }

  // getAllProduct(): void {
  //   this._apiProduct.getAll().subscribe((res: any) => {
  //     this.products = res;
  //     this.filteredProducts = [...this.products];
  //     this.maxPriceLimit = Math.max(...this.products.map(p => p.final_price || p.original_price), 0);
  //     this.maxPrice = this.maxPriceLimit;
  //   });
  // }

  getProductsByCategory(categoryId: string): void {
    this._apiProduct.getAll().subscribe((res: any) => {
      this.products = res;
      this.filteredProducts = this.products.filter(product => product.categoryID === categoryId);
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => 
      (this.selectedCategory === 'all' || product.categoryID === this.selectedCategory) &&
      product.final_price >= this.minPrice &&
      product.final_price <= this.maxPrice
    );
  
    this.applySorting();
  }

  applySorting(): void {
    switch (this.sortBy) {
      case 'price_low':
        this.filteredProducts.sort((a, b) => a.final_price - b.final_price);
        break;
      case 'price_high':
        this.filteredProducts.sort((a, b) => b.final_price - a.final_price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.average_rating - a.average_rating);
        break;
      case 'stock':
        this.filteredProducts.sort((a, b) => b.product_stockQuantity - a.product_stockQuantity);
        break;
    }
  }  
}
