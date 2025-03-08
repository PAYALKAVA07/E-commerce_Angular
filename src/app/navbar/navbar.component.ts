import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Category } from '../category';
import { ApiCategoryService } from '../api-category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _api: ApiCategoryService) { }
data: Category[] = [];
  ngOnInit() {
    this._api.getAllCategory().subscribe((res: any) => {
      this.data = res;
    });
  }
}
