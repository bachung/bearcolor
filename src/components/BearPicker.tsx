import * as React from 'react';
import { Bear, Bears } from 'components/common';

type Props = {
    bear: Bear;
    onChange: (bear: Bear) => void;
};

const BearPicker = ({bear, onChange}: Props) => {
    const [uploaded, setUploaded] = React.useState([] as Bear[]);
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignContent: 'start'}}>
            <div style={{maxWidth: 540, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                {Bears.concat(uploaded).map((bear, idx) => {
                    return <img width={100} height={100} src={bear.url} key={idx} alt={bear.name} onClick={() => onChange(bear)} style={{cursor: 'pointer'}} />;
                })}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'start'}}>
                Upload custom emoji
                <input type="file" accept="image/png" onChange={e => {
                    const file = (e.target.files ?? [])[0];
                    if (file != null) {
                        const fr = new FileReader();
                        fr.readAsDataURL(file);
                        fr.onload = () => {
                            const result = fr.result;
                            if (result != null && typeof result === 'string') {
                                setUploaded(uploaded => ([...uploaded, {
                                    name: `Custom ${uploaded.length + 1}`,
                                    url: result
                                }]));
                            }
                        };
                        
                    }
                }}/>
            </div>
        </div>
    )
};

export default BearPicker;

