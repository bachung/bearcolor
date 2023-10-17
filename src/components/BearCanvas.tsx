import * as React from 'react';
import { createImageFromUrl, ImageDataWrapper } from 'utils/image';
import { expectedG, expectedB, expectedR } from 'components/common';

export type Props = {
    r?: number;
    g?: number;
    b?: number;
};

const WIDTH = 534;
const HEIGHT = 534;
const BEAR = 'https://www.gstatic.com/android/keyboard/emojikitchen/20210831/u1f43b/u1f43b_u1f600.png';
const THRESHOLD = 20;

const BearCanvas = ({r = expectedR, g = expectedG, b = expectedB}: Props) => {
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
                    const image = await createImageFromUrl(BEAR);
                    context.drawImage(image, 0, 0);

                    const imageData = new ImageDataWrapper(
                        context.getImageData(0, 0, WIDTH, HEIGHT, {
                            colorSpace: 'srgb',
                        })
                    );
                    for (let x = 0; x < WIDTH; x++) {
                        for (let y = 0; y < HEIGHT; y++) {
                            const [rv, gv, bv, _] = imageData.getRGBA(x, y);
                            const rDiff = (rv - expectedR);
                            const gDiff = (gv - expectedG);
                            const bDiff = (bv - expectedB);
                            if (Math.abs(rDiff) + Math.abs(gDiff) + Math.abs(bDiff) <= THRESHOLD) {
                                imageData.setRGB(x, y, r + rDiff, g + gDiff, b + bDiff);
                            }
                        }
                    }
                    context.putImageData(imageData.imageData, 0, 0);
                })();
            }
        }
    }, [r, g, b]);

    return (
        <canvas style={{width: WIDTH, height: HEIGHT}} ref={ref} height={HEIGHT} width={WIDTH} />
    );
};

export default BearCanvas;