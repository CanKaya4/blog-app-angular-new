import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArticleService } from '../../../services/ui/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterModule, CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
  article: any; // Makale verisi
  articleId: number;
  safeContent: SafeHtml | null = null;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.article = this.route.snapshot.data['article'];
    console.log(this.article);
    if (this.article) {
      document.title = this.article.title;

      // İçeriği güvenli hale getir
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.article.content);
    }
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
