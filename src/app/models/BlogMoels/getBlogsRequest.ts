import { statfsSync } from "fs";

export interface getBlogsRequest{
    pageIndex: number;
    pageSize: number;
    orderBy: string;
    ordeByColumn: string;
    globalSearch: string;
    categoryId: number;
}