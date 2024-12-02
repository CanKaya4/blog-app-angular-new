import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/ui/article.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }), // Başlangıç opacity
        animate('500ms', style({ opacity: 1 })) // 500ms süresince opacity 1 olur
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 })) // Sayfa çıktığında opacity 0 olur
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  articles: any[] = []; // Makale verileri
  currentPage = 1; // Şu anki sayfa numarası
  pageSize = 10; // Sayfa başına makale sayısı
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
  }


}
