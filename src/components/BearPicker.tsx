import * as React from 'react';
import { Bear, Bears } from 'components/common';

type Props = {
    bear: Bear;
    onChange: (bear: Bear) => void;
};

const BearPicker = ({bear, onChange}: Props) => {
    return (
        <div style={{maxWidth: 540, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
            {Bears.map((bear, idx) => {
                return <img width={100} height={100} src={bear.url} key={idx} alt={bear.name} onClick={() => onChange(bear)} style={{cursor: 'pointer'}} />;
            })}
        </div>
    )
};

export default BearPicker;

