import * as React from "react";
import BearCanvas from "components/BearCanvas";
import { parseColor } from "utils/color";
import BearPicker from "components/BearPicker";
import { getDefaultBearAndColor } from "utils/url";
import {
  PreloadedBear,
  getGradients,
  preload,
} from "components/common";
import rgb2hsl from "pure-color/convert/rgb2hsl";
import hsl2rgb from "pure-color/convert/hsl2rgb";
import rgb2hex from "pure-color/convert/rgb2hex";
import PopoverColorPicker from "components/PopoverColorPicker";

const [DEFAULT_BEAR] = getDefaultBearAndColor();
const ICON_LINK = document.querySelector(
  "link[rel~='icon']"
) as HTMLLinkElement;

const BearColor = () => {
  const [bear, setBear] = React.useState(DEFAULT_BEAR);
  const [data, setData] = React.useState("");
  const [defaultColors, setDefaultColors] = React.useState(
    [] as [number, number, number][]
  );
  const [_, startColorTransition] = React.useTransition();
  const [colors, setColors] = React.useState([] as [number, number, number][]);
  const setColorsTransition = (colors: [number, number, number][]) => {
    startColorTransition(() => setColors(colors));
  };
  const [tolerance, setTolerance] = React.useState(10);

  const [preloadedBear, setPreloadedBear] = React.useState(
    null as null | PreloadedBear
  );

  const gradients = React.useMemo(() => {
    if (preloadedBear != null) {
      const gradients = getGradients(preloadedBear.imageData, tolerance);

      return gradients;
    } else {
      return null;
    }
  }, [preloadedBear, tolerance]);
  React.useEffect(() => {
    (async () => {
      const preloaded = await preload(bear);
      startColorTransition(() => {
        setPreloadedBear(preloaded);
        setTolerance(10);
      });
    })();
  }, [bear]);

  React.useEffect(() => {
    if (gradients != null) {
      setColors(gradients.map((g) => hsl2rgb(g.color)));
      setDefaultColors(gradients.map((g) => hsl2rgb(g.color)));
    }
  }, [gradients]);

  React.useEffect(() => {
    if (ICON_LINK) {
      ICON_LINK.href = data;
    }
  }, [data]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: 8,
            alignItems: "start",
          }}
        >
          {preloadedBear && (
            <BearCanvas
              colors={colors.map(rgb2hsl)}
              bear={preloadedBear}
              onDataChange={setData}
              gradients={gradients ?? []}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            Max color similarity{" "}
            <input
              type="number"
              value={tolerance}
              onChange={(e) =>
                startColorTransition(() => setTolerance(e.target.valueAsNumber))
              }
            />
          </div>

          {colors.map((color, idx) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
              }}
              key={idx}
            >
              <div>Set Color</div>
              <PopoverColorPicker color={rgb2hex(color)} setColor={(color) => {
                setColorsTransition(
                  colors.map((c, curIdx) => {
                    if (curIdx === idx) {
                      return parseColor(color);
                    } else {
                      return c;
                    }
                  })
                );
              }} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setColorsTransition(
                    colors.map((c, curIdx) => {
                      if (curIdx === idx) {
                        return defaultColors[idx];
                      } else {
                        return c;
                      }
                    })
                  );
                }}
              >
                Reset to Default Color
              </button>
              <button
                onClick={(e) => {
                  navigator.clipboard.writeText(rgb2hex(color));
                }}
              >
                Copy to clipboard
              </button>
              <button
                onClick={async (e) => {
                  const clipboardText = await navigator.clipboard.readText();
                  setColorsTransition(
                    colors.map((c, curIdx) => {
                      if (curIdx === idx) {
                        try {
                          return parseColor(clipboardText);
                        } catch (ex) {
                          return c;
                        }
                      } else {
                        return c;
                      }
                    })
                  );
                }}
              >
                Paste
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const a = document.createElement("a");
              a.href = data.replace("image/png", "image/octet-stream");
              a.download = `${bear.name} bear.png`;
              a.click();
            }}
          >
            Download Image
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 16,
            marginTop: 16,
          }}
        >
          <div>Pick your bear</div>
          <BearPicker bear={bear} onChange={setBear} />
        </div>
      </div>
    </div>
  );
};

export default BearColor;
