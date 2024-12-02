import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/ui/article.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogsCategoriesComponent } from '../blogs-categories/blogs-categories.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-category-list',
  imports: [BlogsCategoriesComponent, CommonModule, RouterModule],
  templateUrl: './blog-category-list.component.html',
  styleUrl: './blog-category-list.component.css'
})
export class BlogCategoryListComponent implements OnInit {
  articles: any[] = [];
  categoryId!: number;
  pageNumber: number = 1; // Başlangıç sayfası
  pageSize: number = 5; // Sayfa boyutu
  currentPage = 1; // Şu anki sayfa numarası

  totalCount = 0; // Toplam makale sayısı
  totalPages = 0; // Toplam sayfa sayısı
  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // Rota parametresini al
    this.route.params.subscribe((params) => {
      this.categoryId = +params['categoryId']; // Parametreyi al ve sayıya çevir
      if (this.categoryId) {
        this.loadArticles(this.currentPage); // İlk sayfayı yükle
      }
    });
  }


  loadArticles(page: number): void {
    this.articleService.getArticlesByCategory(this.categoryId, page, this.pageSize).subscribe(
      (response) => {
        console.log('API Response:', response);
        this.articles = response.articles; // Makaleleri yükle
        this.totalCount = response.totalCount; // Toplam makale sayısını ayarla
        this.totalPages = Math.ceil(this.totalCount / this.pageSize); // Toplam sayfa sayısını hesapla
        console.log('Loaded Articles:', this.articles);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Geçersiz sayfa numarası ise işlem yapma
    }
    this.currentPage = page; // Mevcut sayfayı güncelle
    this.loadArticles(page); // Yeni sayfayı yükle
  }

  private updateArticlesData(data: any): void {
    this.articles = data.articles;
    this.totalCount = data.totalCount;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
  }
}
