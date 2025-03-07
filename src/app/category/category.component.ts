import { Component } from '@angular/core';
import { ApiCategoryService } from '../api-category.service';
import { Category } from '../category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private _api: ApiCategoryService) { }

  data: Category[] = [];
  ngOnInit() {
    this._api.getAllCategory().subscribe((res: any) => {
      this.data = res;
    });
  }
}
