import * as React from 'react';
import BearCanvas from 'components/BearCanvas';
import { parseColor } from 'utils/color';
import BearPicker from 'components/BearPicker';
import { getDefaultBearAndColor } from 'utils/url';
import { PreloadedBear, preload } from 'components/common';
import rgb2hsl from 'pure-color/convert/rgb2hsl';
import hsl2rgb from 'pure-color/convert/hsl2rgb';
import rgb2hex from 'pure-color/convert/rgb2hex';

const [DEFAULT_BEAR] = getDefaultBearAndColor();
const ICON_LINK = document.querySelector('link[rel~=\'icon\']') as HTMLLinkElement;

const BearColor = () => {
    const [bear, setBear] = React.useState(DEFAULT_BEAR);
    const [data, setData] = React.useState('');
    const [defaultColors, setDefaultColors] = React.useState([] as [number, number, number][]);
    const [colors, setColors] = React.useState([] as [number, number, number][]);

    const [preloadedBear, setPreloadedBear] = React.useState(null as null | PreloadedBear);

    React.useEffect(() => {
        (async () => {
            const preloaded = await preload(bear);
            setPreloadedBear(preloaded);
            setColors(preloaded.gradients.map(g => hsl2rgb(g.color)));
            setDefaultColors(preloaded.gradients.map(g => hsl2rgb(g.color)));
        })();
    }, [bear]);

    React.useEffect(() => {
        if (ICON_LINK) {
            ICON_LINK.href = data;
        }
    }, [data]);


    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 16}}>
                <div style={{display: 'flex', flexDirection: 'column', height: '100%', gap: 8, alignItems: 'start'}}>
                    {preloadedBear && <BearCanvas colors={colors.map(rgb2hsl)} bear={preloadedBear} onDataChange={setData} />}
                    {
                        colors.map((color, idx) => (
                            <div style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}} key={idx}>
                                <div>Set Color</div>
                                <input type='color' onChange={(e) => {
                                    setColors(colors.map((c, curIdx) => {
                                        if (curIdx === idx) {
                                            return parseColor(e.target.value);
                                        } else {
                                            return c;
                                        }
                                    }));
                                }} value={rgb2hex(color)} />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setColors(colors.map((c, curIdx) => {
                                        if (curIdx === idx) {
                                            return defaultColors[idx];
                                        } else {
                                            return c;
                                        }
                                    }));
                                }}>Reset to Default Color</button>
                            </div>
                        ))
                    }
                    <button onClick={() => {
                        const a = document.createElement('a');
                        a.href = data.replace('image/png', 'image/octet-stream');
                        a.download = `${bear.name} bear.png`;
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