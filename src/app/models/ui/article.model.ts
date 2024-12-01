export interface Article {
    id: number;
    title: string;
    content: string;
    keyword: string;
    isDeleted: boolean;
    tagName?: string;  // Optional, çünkü tag name her zaman olmayabilir
    categoryNames: string[];
}