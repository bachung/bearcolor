import { ImageDataWrapper, Point, PointSet, createImageFromUrl } from "utils/image";

export type Bear = {
    name: string,
    url: string,
    defaultThreshold?: number,
};

type PointWithColor = [Point, number, number, number];

export type Gradient = {
    points: PointWithColor[];
    color: [number, number, number];
};

export type PreloadedBear = {
    bear: Bear;
    image: HTMLImageElement;
    gradients: Gradient[];
};

export const Bears: Bear[] = [
    {name: 'Smile', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f600.png'},
    {name: 'Rofl', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f923.png'},
    {name: 'Cowbear', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f920.png'},
    // {name: 'Celebrate', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f973.png'},
    {name: 'Frowning', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f626.png'},
    {name: 'Anguished', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f627.png'},
    {name: 'Starstruck', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f929.png'},
    // {name: 'Thinking', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f914.png'},
    {name: 'Injured', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f915.png'},
    {name: 'Sleepy', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f634.png'},
    {name: 'Sad', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f622.png'},
    {name: 'Cool', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f60e.png'},
    {name: 'Monocle', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f9d0.png'},
    {name: 'Accounting', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f913.png'},
    {name: 'Pleading', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f97a.png'},
    {name: 'Angry', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f620.png'},
    {name: 'Superfrown', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u2639-ufe0f.png'},
    {name: 'Pensive', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f614.png'},
    {name: 'Melting', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20211115/u1fae0/u1fae0_u1f43b.png'},
    {name: 'Exploding', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f92f.png'},
    {name: 'Zany', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f92a.png'},
    {name: 'Money', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f911.png'},
    // {name: 'Hide', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20211115/u1fae3/u1fae3_u1f43b.png'},
    {name: 'Peek', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f573-ufe0f.png'},
    {name: 'Angel', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f607.png'},
    {name: 'Single Tear', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f972.png'},
    {name: 'Sweat Smile', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f605.png'},
    {name: 'Upside Down', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f643.png'},
    {name: 'Fearful', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f628.png'},
    {name: 'Evil', url: 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f608.png'}
];

export const preload = async (bear: Bear): Promise<PreloadedBear> => {
    const image = await createImageFromUrl(bear.url);
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', {
        willReadFrequently: true
    });

    if (context == null) {
        throw new Error("Can't continue with missing context");
    }

    context.drawImage(image, 0, 0);


    const imageData = new ImageDataWrapper(context.getImageData(0, 0, width, height));

    const serializeColor = (r: number, g: number, b: number) => `${r},${g},${b}`
    const deserializeColor = (serialized: string): [number, number, number] => {
        return serialized.split(",").map(a => parseInt(a)) as [number, number, number];
    };
    const getAreaColor = (area: PointWithColor[]) => {
        const colorCounts = area.reduce((colorCounts, [_, curR, curG, curB]) => {
            const serialized = serializeColor(curR, curG, curB);
            colorCounts[serialized] = colorCounts[serialized] ?? 0;
            colorCounts[serialized] += 1;
            return colorCounts;
        }, {} as Record<string, number>);
        
        const mostCommonColor = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a])[0];

        return deserializeColor(mostCommonColor);

    }
    const threshold = bear.defaultThreshold ?? 10;
    const areas: Point[][] = [];
    const visited = new PointSet(imageData);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (!visited.has([x, y])) {
                const area = imageData.getGradientArea(x, y, threshold);
                if (area.length > 1) {
                    areas.push(area);
                    area.forEach(p => visited.add(p));
                }
            }
        }
    }
    const areasWithColors: PointWithColor[][] = areas.map(gradient => gradient.map(point => {
        const [x, y] = point;
        const [r, g, b] = imageData.getHSLA(x, y);
        return [point, r, g, b];
    }))
    const areasWithSameColor = areasWithColors.reduce((result, gradient) => {
        const color = getAreaColor(gradient);
        const asNumber = serializeColor(color[0], color[1], color[2]);
        result[asNumber] = result[asNumber] ?? [];
        result[asNumber].push(gradient);
        return result;
    }, {} as Record<string, PointWithColor[][]>);
    const combinedAreas = Object.keys(areasWithSameColor).map(key => {
        const matching = areasWithSameColor[key];
        const combined = matching.reduce((a, b) => a.concat(b));
        return combined;
    })
    const topColors = combinedAreas.sort((a, b) => b.length - a.length).slice(0, 10);

    return {
        bear,
        image,
        gradients: topColors.map(pointsWithColors => ({
            points: pointsWithColors,
            color: getAreaColor(pointsWithColors),
        }))
    };
}