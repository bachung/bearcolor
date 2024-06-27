import * as React from "react";
import { Gradient, PreloadedBear } from "components/common";

export type Props = {
  bear: PreloadedBear;
  colors?: [number, number, number][];
  showAreas?: boolean;
  onDataChange?: (data: string) => void;
  gradients: Gradient[];
};

const WIDTH = 534;
const HEIGHT = 534;

const BearCanvas = ({
  bear: { imageData },
  colors = [],
  onDataChange,
  showAreas = false,
  gradients,
}: Props) => {
  const [canvas, setCanvas] = React.useState(null as null | HTMLCanvasElement);
  const context = React.useMemo(() => {
    if (canvas instanceof HTMLCanvasElement) {
      return canvas.getContext("2d", {
        willReadFrequently: false,
      });
    }
    return null;
  }, [canvas]);
  React.useEffect(() => {
    if (context && imageData) {
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
  }, [canvas, colors, context, gradients, imageData, onDataChange]);

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
