
const mapping: Record<string, Promise<HTMLImageElement>> = {};

export const createImageFromUrl = (url: string) => {
    if (mapping[url] != null) return mapping[url];

    const result = new Promise((resolve: (value: HTMLImageElement) => void, reject) => {
        const image = new Image();
        image.crossOrigin = "Anonymous";
        image.onload = () => {
            resolve(image);
        };
        image.onerror = reject;
        image.src = url;
    });
    mapping[url] = result;

    return result;
}

export class ImageDataWrapper {
    imageData: ImageData;
    width: number;
    height: number;

    constructor(imageData: ImageData) {
        this.imageData = imageData;
        this.width = imageData.width;
        this.height = imageData.height;
    }

    getRGBA(x: number, y: number): [number, number, number, number] {
        const base = y * (this.width * 4) + x * 4;

        return [
            this.imageData.data[base],
            this.imageData.data[base + 1],
            this.imageData.data[base + 2],
            this.imageData.data[base + 3],
        ];
    }

    setRGB(x: number, y: number, r: number, g: number, b: number, a: number = 255) {
        const base = y * (this.width * 4) + x * 4;

        r = Math.max(0, Math.min(r, 255));
        g = Math.max(0, Math.min(g, 255));
        b = Math.max(0, Math.min(b, 255));
        a = Math.max(0, Math.min(a, 255));

        this.imageData.data[base] = r;
        this.imageData.data[base + 1] = g;
        this.imageData.data[base + 2] = b;
        this.imageData.data[base + 3] = a;
    }
}