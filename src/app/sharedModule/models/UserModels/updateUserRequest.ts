export interface updateUserRequet {
    id: number;
    roleId: number,
    salutation: string,
    firstName: string,
    lastName: string,
    email: string,
    isdCode: string,
    mobileNumber: string,
    image: string,
    imageName: string,
    imageExtension: string,
    removeImage: boolean;
}