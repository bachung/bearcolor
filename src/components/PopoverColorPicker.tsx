import * as React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Popover } from "react-tiny-popover";

type Props = {
  color: string;
  setColor: (color: string) => void;
};

const POSITIONS: ["right", "bottom", "left", "top"] = [
  "right",
  "bottom",
  "left",
  "top",
];

const PRESET_COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#cc0000",
  "#00cc00",
  "#0000cc",
  "#cccc00",
  "#cc00cc",
  "#00cccc",
  "#aa0000",
  "#00aa00",
  "#0000aa",
  "#aaaa00",
  "#aa00aa",
  "#00aaaa",
];

const PopoverColorPicker = ({ color, setColor }: Props) => {
  const [open, setOpen] = React.useState(false);
  const colorPicker = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        borderRadius: 8,
        gap: 8,
        backgroundColor: "white",
        border: "1px solid black",
        overflow: "visible",
      }}
    >
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          maxWidth: 200,
          overflow: "hidden",
        }}
      >
        {PRESET_COLORS.map((color) => {
          return (
            <button
              style={{
                borderRadius: 4,
                width: 16,
                height: 16,
                display: "block",
                border: "none",
                cursor: "pointer",
                backgroundColor: color,
              }}
              key={color}
              onClick={() => setColor(color)}
            />
          );
        })}
      </div>
    </div>
  );
  return (
    <Popover
      isOpen={open}
      positions={POSITIONS}
      content={colorPicker}
      onClickOutside={() => setOpen(false)}
      align="start"
    >
      <button
        style={{
          borderRadius: 8,
          width: 24,
          height: 24,
          backgroundColor: color,
          border: "1px black solid",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      />
    </Popover>
  );
};

export default PopoverColorPicker;
