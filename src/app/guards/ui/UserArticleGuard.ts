import { ResolveFn } from "@angular/router";
import { Article } from "../../models/ui/article.model";
import { inject } from "@angular/core";
import { ArticleService } from "../../services/ui/article.service";
import { delay } from "rxjs";

export const resolveGuard: ResolveFn<any> = (route, state) => {
    const articleService = inject(ArticleService);

    const pageNumber = parseInt(route.queryParamMap.get('pageNumber') || '1', 10);
    const pageSize = parseInt(route.queryParamMap.get('pageSize') || '5', 10);

    return articleService.getPagedArticles(pageNumber, pageSize).pipe(delay(1000));

}