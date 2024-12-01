import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/ui/category.mode';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '../../../services/ui/categories.service';

@Component({
  selector: 'app-blogs-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './blogs-categories.component.html',
  styleUrl: './blogs-categories.component.css'
})
export class BlogsCategoriesComponent implements OnInit {
  categories: Category[] = []
  constructor(private categoryService: CategoriesService) { }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((data) => {
      this.categories = data
    }, (error) => {
      console.log("category error :", error)
    })
  }

}
