import * as React from 'react';
import { createImageFromUrl, ImageDataWrapper } from 'utils/image';
import { Bear } from 'components/common';

export type Props = {
    bear: Bear;
    r?: number;
    g?: number;
    b?: number;
    onDataChange?: (data: string) => void;
};

const WIDTH = 534;
const HEIGHT = 534;
const THRESHOLD = 10;
const MAX_COLOR_CHANGE = 50;

const clamp = (num: number, min: number = -MAX_COLOR_CHANGE, max: number = MAX_COLOR_CHANGE): number => {
    if (num < min) {
        return min;
    } else if (num > max) {
        return max;
    } else {
        return num;
    }
};

const BearCanvas = ({bear, r = bear.defaultColor[0], g = bear.defaultColor[1], b = bear.defaultColor[2], onDataChange}: Props) => {
    const ref = React.useRef(null as null | HTMLCanvasElement);
    React.useEffect(() => {
        const current = ref.current;
        if (current instanceof HTMLCanvasElement) {
            const canvas = current;
            const context = canvas.getContext('2d', {
                willReadFrequently: true
            });
            if (context) {
                (async () => {
                    const image = await createImageFromUrl(bear.url);
                    context.clearRect(0, 0, WIDTH, HEIGHT);
                    context.drawImage(image, 0, 0);

                    const imageData = new ImageDataWrapper(
                        context.getImageData(0, 0, WIDTH, HEIGHT, {
                            colorSpace: 'srgb',
                        })
                    );
                    for (let x = 0; x < WIDTH; x++) {
                        for (let y = 0; y < HEIGHT; y++) {
                            const [rv, gv, bv] = imageData.getRGBA(x, y);
                            const rDiff = (rv - bear.defaultColor[0]);
                            const gDiff = (gv - bear.defaultColor[1]);
                            const bDiff = (bv - bear.defaultColor[2]);

                            const totalDiff = Math.abs(rDiff) + Math.abs(gDiff) + Math.abs(bDiff);
                            if (totalDiff <= THRESHOLD) {
                                imageData.setRGB(x, y, r + clamp(rDiff), g + clamp(gDiff), b + clamp(bDiff));
                            }
                        }
                    }
                    context.putImageData(imageData.imageData, 0, 0);
                    if (onDataChange) {
                        onDataChange(canvas.toDataURL('image/png'));
                    }
                })();
            }
        }
    }, [r, g, b, bear, onDataChange]);

    return (
        <canvas style={{width: WIDTH, height: HEIGHT}} ref={ref} height={HEIGHT} width={WIDTH} />
    );
};

export default BearCanvas;