export class ImageUploadError extends Error {
    constructor(imageName: string) {
        super(`Error uploading image ${imageName}`);
    }
}