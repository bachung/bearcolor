export const parseColor = (hex: string): [number, number, number] => {
    const replaced = hex.replaceAll('#', '');

    return [
        parseInt(replaced.substring(0, 2), 16),
        parseInt(replaced.substring(2, 4), 16),
        parseInt(replaced.substring(4, 6), 16),
    ]
};

const pad0 = (str: string, len: number): string => {
    if (str.length >= len) return str;
    return pad0("0" + str, len - 1);
}

export const serializeColor = (r: number, g: number, b: number) => {
    return '#' + pad0(r.toString(16), 2) + pad0(g.toString(16), 2) + pad0(b.toString(16), 2);
}
