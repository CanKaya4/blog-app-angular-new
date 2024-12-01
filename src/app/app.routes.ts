import { Routes } from '@angular/router';
import { UiLayoutComponent } from './layouts/ui/ui-layout/ui-layout.component';
import { HomeComponent } from './components/ui/home/home.component';
import { AboutComponent } from './components/ui/about/about.component';
import { BlogsComponent } from './components/ui/blogs/blogs.component';
import { BlogTagsComponent } from './components/ui/blog-tags/blog-tags.component';
import { BlogDetailComponent } from './components/ui/blog-detail/blog-detail.component';
import { resolveGuard } from './guards/ui/UserArticleGuard';

export const routes: Routes = [
    {
        path: '', component: UiLayoutComponent, children:
            [
                { path: '', component: HomeComponent, resolve: { articles: resolveGuard }, data: { title: 'Anasayfa' } },
                { path: 'about', component: AboutComponent },
                { path: 'blogs', component: BlogsComponent, resolve: { articles: resolveGuard } },
                { path: 'tags', component: BlogTagsComponent },
                { path: 'detail/:id', component: BlogDetailComponent },
            ]
    },
];
