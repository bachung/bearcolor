import rgb2hsl from "pure-color/convert/rgb2hsl";
import hsl2rgb from "pure-color/convert/hsl2rgb";

const mapping: Record<string, Promise<HTMLImageElement>> = {};

export const createImageFromUrl = (url: string) => {
  if (mapping[url] != null) return mapping[url];

  const result = new Promise(
    (resolve: (value: HTMLImageElement) => void, reject) => {
      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        resolve(image);
      };
      image.onerror = reject;
      image.src = url;
    }
  );
  mapping[url] = result;

  return result;
};

export type Point = [number, number];

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
] as const;

export class PointSet {
  private imageData: ImageDataWrapper;
  private set: boolean[];

  constructor(imageData: ImageDataWrapper) {
    this.imageData = imageData;
    this.set = [];
    for (let i = 0; i < this.imageData.width; i++) {
      for (let j = 0; j < this.imageData.height; j++) {
        this.set.push(false);
      }
    }
    // this.set = new Set(arr.map(this.serialize));
  }

  add(point: Point) {
    this.set[this.serialize(point)] = true;
  }

  has(point: Point) {
    return this.set[this.serialize(point)];
  }

  private serialize([x, y]: Point) {
    return y * this.imageData.width + x;
  }
}

export class ImageDataWrapper {
  imageData: ImageData;
  width: number;
  height: number;
  hslCache: [number, number, number, number][][];
  diffCache: number[][][] | null;

  constructor(imageData: ImageData) {
    this.imageData = imageData;
    this.width = imageData.width;
    this.height = imageData.height;
    this.hslCache = [];
    this.diffCache = null;

    for (let x = 0; x < this.width; x++) {
      this.hslCache.push([]);
      const cur = this.hslCache[x];
      for (let y = 0; y < this.height; y++) {
        const [r, g, b, a] = this.getRGBA(x, y);
        const hsl = rgb2hsl([r, g, b]);
        cur.push(hsl.concat([a]) as [number, number, number, number]);
      }
    }
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

  getHSLA(x: number, y: number): [number, number, number, number] {
    return this.hslCache[x][y];
  }

  setRGB(
    x: number,
    y: number,
    r: number,
    g: number,
    b: number,
    a: number = 255
  ) {
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

  setHSL(x: number, y: number, h: number, s: number, l: number) {
    const [r, g, b] = hsl2rgb([h, s, l]);
    this.setRGB(x, y, Math.floor(r), Math.floor(g), Math.floor(b));
  }

  getGradientArea(
    x: number,
    y: number,
    tolerance: number = 10,
    visited: PointSet = new PointSet(this)
  ): Point[] {
    if (this.diffCache == null) {
      this.diffCache = [];
      for (let x = 0; x < this.width; x++) {
        this.diffCache.push([]);
        for (let y = 0; y < this.height; y++) {
          const [r, g, b] = this.getHSLA(x, y);
          this.diffCache[x][y] = DIRS.map(([dx, dy]) => {
            const point: Point = [x + dx, y + dy];
            if (
              point[0] < 0 ||
              point[0] >= this.width ||
              point[1] < 0 ||
              point[1] >= this.height
            )
              return Number.MAX_SAFE_INTEGER;
            const [rx, gx, bx, a] = this.getHSLA(point[0], point[1]);

            if (a === 0) return Number.MAX_SAFE_INTEGER;

            const rDiff = Math.abs(rx - r);
            const gDiff = Math.abs(gx - g);
            const bDiff = Math.abs(bx - b);
            return rDiff + gDiff + bDiff;
          });
        }
      }
    }
    const start: Point = [x, y];
    const stack: Point[] = [start];

    const result: Point[] = [];
    visited.add(start);

    let cur: undefined | Point;
    while ((cur = stack.pop()) !== undefined) {
      result.push(cur);
      const [x, y] = cur;
      DIRS.forEach(([dx, dy], i) => {
        const point: Point = [x + dx, y + dy];

        if (
          (this.diffCache as number[][][])[x][y][i] <= tolerance &&
          !visited.has(point)
        ) {
          visited.add(point);
          stack.push(point);
        }
      });
    }

    return result;
  }
}
