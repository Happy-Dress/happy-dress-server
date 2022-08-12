export class InvalidImageError extends Error {
    constructor(message: string, imageName: string) {
        super(`${message} image: ${imageName}`);
    }
}