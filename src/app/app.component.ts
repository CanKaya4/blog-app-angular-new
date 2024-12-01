import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;
  loadingMessage: string = '';

  // C# ile ilgili 5 kısa bilgi
  csharpInfo: string[] = [
    'C# statik tipli, nesne yönelimli bir dildir ve güçlü bir tip denetimi sağlar.',
    'C# dilinde LINQ (Language Integrated Query) kullanarak koleksiyonlar üzerinde sorgular yazılabilir.',
    'C# dilinde async ve await anahtar kelimeleri, asenkron programlamayı kolaylaştırır.',
    'C# dilinde Garbage Collection (Çöp Toplama), bellek yönetimini otomatik olarak sağlar.',
    'C# dilinde delegeler, metot referansları tutarak olay tabanlı programlama için kullanılır.'
  ];

  // SQL ile ilgili 5 kısa bilgi
  sqlInfo: string[] = [
    'SQL dilinde JOIN komutları, farklı tablolardaki ilişkili verileri birleştirmek için kullanılır.',
    'SQL dilinde GROUP BY komutu, verileri belirli bir sütuna göre gruplayarak özet bilgisi elde etmeyi sağlar.',
    'SQL dilinde INDEX kullanarak sorgu performansı artırılabilir.',
    'SQL dilinde WHERE komutu, veritabanı sorgularında filtreleme işlemi yapar.',
    'SQL dilinde ALTER TABLE komutu, mevcut bir tablonun yapısını değiştirmek için kullanılır.'
  ];

  // Entity Framework ile ilgili 5 kısa bilgi
  efInfo: string[] = [
    'Entity Framework (EF), .NET uygulamalarında veritabanı işlemlerini gerçekleştiren bir ORM (Object-Relational Mapping) aracıdır.',
    'EF ile, SQL sorguları yazmadan veritabanı nesneleri ile çalışabilir ve LINQ sorguları kullanabilirsiniz.',
    'EF Core daha hızlı ve hafif bir ORM olup, hem ilişkisel hem de NoSQL veritabanlarını destekler.',
    'EF ile veritabanı şeması, DbContext sınıfında tanımlanan modellerle otomatik olarak oluşturulabilir.',
    'EF migrasyonları, veritabanı şemasındaki değişiklikleri yönetmek ve güncellemek için kullanılır.'
  ];
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true; // Sayfa yükleniyor
        this.setRandomInfo();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false; // Yükleme tamamlandı
        }, 500); // Animasyonun görünmesi için kısa bir gecikme
      }
    });
  }
  setRandomInfo(): void {
    const allInfo = [
      ...this.csharpInfo,
      ...this.sqlInfo,
      ...this.efInfo
    ];
    const randomIndex = Math.floor(Math.random() * allInfo.length);
    this.loadingMessage = allInfo[randomIndex];
  }
}
