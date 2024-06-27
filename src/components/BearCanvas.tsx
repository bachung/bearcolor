import * as React from "react";
import { ImageDataWrapper } from "utils/image";
import { PreloadedBear } from "components/common";

export type Props = {
  bear: PreloadedBear;
  colors?: [number, number, number][];
  showAreas?: boolean;
  onDataChange?: (data: string) => void;
};

const WIDTH = 534;
const HEIGHT = 534;

const BearCanvas = ({
  bear: { bear, image, gradients },
  colors = [],
  onDataChange,
  showAreas = false,
}: Props) => {
  const [canvas, setCanvas] = React.useState(null as null | HTMLCanvasElement);
  const context = React.useMemo(() => {
    if (canvas instanceof HTMLCanvasElement) {
      return canvas.getContext("2d", {
        willReadFrequently: true,
      });
    }
    return null;
  }, [canvas]);
  const imageDataWrapper = React.useMemo((): ImageDataWrapper | null => {
    if (context) {
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.drawImage(image, 0, 0);

      return new ImageDataWrapper(
        context.getImageData(0, 0, WIDTH, HEIGHT, {
          colorSpace: "srgb",
        })
      );
    }
    return null;
  }, [image, context]);
  React.useEffect(() => {
    if (context && imageDataWrapper) {
      const imageData = imageDataWrapper;
      gradients.forEach(({ points, color }, idx) => {
        if (idx < colors.length) {
          const [r, g, b] = colors[idx];
          points.forEach(([[x, y], rv, gv, bv]) => {
            const diffR = rv - color[0];
            const diffG = gv - color[1];
            const diffB = bv - color[2];

            imageData.setHSL(x, y, r + diffR, g + diffG, b + diffB);
          });
        }
      });
      context.putImageData(imageData.imageData, 0, 0);
      if (onDataChange && canvas) {
        onDataChange(canvas.toDataURL("image/png"));
      }
    }
  }, [canvas, colors, context, gradients, imageDataWrapper, onDataChange]);

  return (
    <canvas
      style={{ width: WIDTH, height: HEIGHT }}
      ref={setCanvas}
      height={HEIGHT}
      width={WIDTH}
    />
  );
};

export default BearCanvas;
