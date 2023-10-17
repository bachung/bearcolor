import * as React from 'react';
import BearCanvas from "components/BearCanvas";
import { parseColor, serializeColor } from "utils/color";
import { expectedB, expectedG, expectedR } from "components/common";

const DEFAULT_COLOR_HEX = serializeColor(expectedR, expectedG, expectedB);

const BearColor = () => {

    const [color, setColor] = React.useState(DEFAULT_COLOR_HEX);
    const [r, g, b] = parseColor(color);

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100% '}}>
            <BearCanvas r={r} g={g} b={b} />
            <input type="color" onChange={(e) => setColor(e.target.value)} value={color} />
        </div>
    )
}

export default BearColor;