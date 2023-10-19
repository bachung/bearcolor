
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

export type Point = [number, number];

const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
] as const;

export class PointSet {
    private imageData: ImageDataWrapper;
    private set: Set<number>;

    constructor(imageData: ImageDataWrapper, arr: Point[] = []) {
        this.imageData = imageData;
        this.set = new Set(arr.map(this.serialize));
    }

    add(point: Point) {
        this.set.add(this.serialize(point));
    }

    has(point: Point) {
        return this.set.has(this.serialize(point));
    }

    private serialize([x, y]: Point) {
        return y * this.imageData.width + x;
    }
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

    getGradientArea(x: number, y: number, tolerance: number = 10, visited: PointSet = new PointSet(this)): Point[] {
        const start: Point = [x, y];
        const stack: Point[] = [start];

        const result: Point[] = [];

        let cur: undefined | Point;
        while ((cur = stack.pop()) !== undefined) {
            result.push(cur);
            const [x, y] = cur;
            const [r, g, b] = this.getRGBA(x, y);

            DIRS.forEach(([dx, dy]) => {
                const point: Point = [x + dx, y + dy];
                const [nextX, nextY] = point;
                if (nextX < 0 || nextX >= this.width || nextY < 0 || nextY >= this.height) return;
                if (visited.has(point)) return;

                const [rx, gx, bx, a] = this.getRGBA(nextX, nextY);

                // skip all transparent
                if (a === 0) return;

                const rDiff = Math.abs(rx - r);
                const gDiff = Math.abs(gx - g);
                const bDiff = Math.abs(bx - b);
                const totalDiff = rDiff + gDiff + bDiff;
                if (totalDiff <= tolerance) {
                    visited.add(point);
                    stack.push(point);
                }
            });
        }

        return result;
    }
}