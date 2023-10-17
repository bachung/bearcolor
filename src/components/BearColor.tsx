import * as React from 'react';
import BearCanvas from 'components/BearCanvas';
import { parseColor, serializeColor } from 'utils/color';
import BearPicker from 'components/BearPicker';
import { getDefaultBearAndColor, setBearAndColorUrl } from 'utils/url';

const [DEFAULT_BEAR, DEFAULT_COLOR_HEX] = getDefaultBearAndColor();
const ICON_LINK = document.querySelector('link[rel~=\'icon\']') as HTMLLinkElement;

const BearColor = () => {
    const [bear, setBear] = React.useState(DEFAULT_BEAR);
    const [color, setColor] = React.useState(DEFAULT_COLOR_HEX);
    const [data, setData] = React.useState('');
    const [r, g, b] = parseColor(color);

    React.useEffect(() => {
        setBearAndColorUrl(bear, color);
    }, [color, bear]);

    React.useEffect(() => {
        if (ICON_LINK) {
            ICON_LINK.href = data;
        }
    }, [data]);


    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 16}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 8, alignItems: 'start'}}>
                    <BearCanvas r={r} g={g} b={b} bear={bear} onDataChange={setData} />
                    <div style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                        <div>Set Color</div>
                        <input type='color' onChange={(e) => setColor(e.target.value)} value={color} />
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setColor(serializeColor(bear.defaultColor[0], bear.defaultColor[1], bear.defaultColor[2]));
                    }}>Reset to Default Color</button>
                    <button onClick={() => {
                        const a = document.createElement('a');
                        a.href = data.replace('image/png', 'image/octet-stream');
                        a.download = `${bear.name} bear ${color}.png`;
                        a.click();                
                    }}>Download Image</button>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16, marginTop: 16}}>
                    <div>Pick your bear</div>
                    <BearPicker bear={bear} onChange={setBear} />
                </div>
            </div>
        </div>
    )
}

export default BearColor;