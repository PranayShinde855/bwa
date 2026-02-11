export interface BlogUpdateRequest {
    id: number;
    categoryId: number;
    title: string;
    content: string;
    image: string;
    imageName: string;
    imageExtension: string;
    removeImage: boolean;
}