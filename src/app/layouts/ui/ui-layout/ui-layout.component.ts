import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ArticleService } from '../../../services/ui/article.service';

@Component({
  selector: 'app-ui-layout',
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './ui-layout.component.html',
  styleUrl: './ui-layout.component.css'
})
export class UiLayoutComponent {
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(private articleService: ArticleService) {
    this.loadTheme();
  }

  toggleTheme() {
    // Dark sınıfını ekleyip çıkararak tema değiştir
    const isDarkMode = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }

  loadTheme() {
    // Eğer localStorage'da tema tercihi yoksa, varsayılan olarak karanlık temayı uygula
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      // Varsayılan olarak karanlık tema uygula
      if (!savedTheme) {
        document.documentElement.classList.add('dark');
      }
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.articleService.searchArticles(this.searchTerm).subscribe(
        (results) => {
          this.searchResults = results; // Arama sonuçlarını güncelliyoruz
          console.log('Search results:', results);
        },
        (error) => {
          console.error('Error during search:', error);
        }
      );
    }
  }
}
