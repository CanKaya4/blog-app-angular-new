export interface Category {
    id: number;
    categoryName: string;
    priorty: number;
    parentId: number;
    isDeleted: boolean;
    createdDate: Date;
}