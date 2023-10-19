declare module 'pure-color/convert/rgb2hsl' {
    function rgb2hsl(rgb: [number, number, number]): [number, number, number];

    export = rgb2hsl;
}

declare module 'pure-color/convert/hsl2rgb' {
    function hsl2rgb(hsl: [number, number, number]): [number, number, number];

    export = hsl2rgb;
}

declare module 'pure-color/convert/rgb2hex' {
    function rgb2hex(rgb: [number, number, number]): string;

    export = rgb2hex;
}

declare module 'pure-color/convert/hex2rgb' {
    function hex2rgb(string): [number, number, number];

    export = hex2rgb;
}
