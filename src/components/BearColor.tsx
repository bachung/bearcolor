import * as React from 'react';
import BearCanvas from "components/BearCanvas";
import { parseColor, serializeColor } from "utils/color";
import { Bears, expectedB, expectedG, expectedR } from "components/common";
import BearPicker from 'components/BearPicker';

const DEFAULT_COLOR_HEX = serializeColor(expectedR, expectedG, expectedB);

const BearColor = () => {
    const [bear, setBear] = React.useState(Bears[0]);
    const [color, setColor] = React.useState(DEFAULT_COLOR_HEX);
    const [r, g, b] = parseColor(color);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <BearCanvas r={r} g={g} b={b} bear={bear} />
            <div style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 8}}>
                <div style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: "center"}}>
                    <div>Set Color</div>
                    <input type="color" onChange={(e) => setColor(e.target.value)} value={color} />
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    setColor(DEFAULT_COLOR_HEX)
                }} style={{width: 200}}>Reset to Default Color</button>
                <BearPicker bear={bear} onChange={setBear} />
            </div>
        </div>
    )
}

export default BearColor;