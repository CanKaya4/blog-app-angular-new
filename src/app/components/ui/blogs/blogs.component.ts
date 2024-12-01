import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { BlogsCategoriesComponent } from '../blogs-categories/blogs-categories.component';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../../../services/ui/article.service';

@Component({
  selector: 'app-blogs',
  imports: [BlogsCategoriesComponent, CommonModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  articles: any[] = []; // Makale verileri
  currentPage = 1; // Şu anki sayfa numarası
  pageSize = 5; // Sayfa başına makale sayısı
  totalCount = 0; // Toplam makale sayısı
  totalPages = 0; // Toplam sayfa sayısı
  isLoading = true;
  searchTerm: string = '';
  constructor(private articleService: ArticleService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    // route.data üzerinden resolve edilen veriyi alıyoruz
    this.route.data.subscribe(data => {
      const articlesData = data['articles']; // resolveGuard'dan gelen veri
      this.articles = articlesData.articles;
      this.totalCount = articlesData.totalCount;
      this.totalPages = Math.ceil(this.totalCount / this.pageSize);
      this.isLoading = false;
    });
    console.log(this.articles)
  }
  changePage(page: number): void {
    // Sayfa numarasını değiştiriyoruz
    if (page < 1 || page > this.totalPages) {
      return; // Geçersiz sayfa numarasını önlüyoruz
    }

    this.isLoading = true;
    this.articleService.getPagedArticles(page, this.pageSize).subscribe(
      data => {
        this.updateArticlesData(data);
        this.currentPage = page;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading articles', error);
        this.isLoading = false;
      }
    );
  }

  private updateArticlesData(data: any): void {
    this.articles = data.articles;
    this.totalCount = data.totalCount;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
  }


}
