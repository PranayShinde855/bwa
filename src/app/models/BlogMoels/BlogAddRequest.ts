export interface BlogAddRequest {
    categoryId:number;
    title: string;
    content: string;
    image: string | null;
    imageName: string | null;
    imageExtension: string | null;
}