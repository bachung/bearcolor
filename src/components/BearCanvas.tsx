import * as React from 'react';
import { ImageDataWrapper } from 'utils/image';
import { PreloadedBear } from 'components/common';

export type Props = {
    bear: PreloadedBear;
    colors?: [number, number, number][];
    showAreas?: boolean;
    onDataChange?: (data: string) => void;
};

const WIDTH = 534;
const HEIGHT = 534;

const BearCanvas = ({bear: {bear, image, gradients}, colors = [], onDataChange, showAreas = false}: Props) => {
    const ref = React.useRef(null as null | HTMLCanvasElement);
    React.useEffect(() => {
        const current = ref.current;
        if (current instanceof HTMLCanvasElement) {
            const canvas = current;
            const context = canvas.getContext('2d', {
                willReadFrequently: true
            });
            if (context) {
                context.clearRect(0, 0, WIDTH, HEIGHT);
                context.drawImage(image, 0, 0);

                const imageData = new ImageDataWrapper(
                    context.getImageData(0, 0, WIDTH, HEIGHT, {
                        colorSpace: 'srgb',
                    })
                );
                gradients.forEach(({points, color}, idx) => {
                    if (idx < colors.length) {
                        const [r, g, b] = colors[idx];
                        points.forEach(([[x, y], rv, gv, bv]) => {
                            const diffR = rv - color[0];
                            const diffG = gv - color[1];
                            const diffB = bv - color[2];

                            imageData.setHSL(x, y, r + diffR, g + diffG, b + diffB);
                        })
                    }
                })
                context.putImageData(imageData.imageData, 0, 0);
                if (onDataChange) {
                    onDataChange(canvas.toDataURL('image/png'));
                }
            }
        }
    }, [bear, onDataChange, showAreas, colors, image, gradients]);

    return (
        <canvas style={{width: WIDTH, height: HEIGHT}} ref={ref} height={HEIGHT} width={WIDTH} />
    );
};

export default BearCanvas;