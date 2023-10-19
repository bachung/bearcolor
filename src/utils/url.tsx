import { Bear, Bears } from "components/common";

export const getDefaultBearAndColor = () => {
    const params = new URLSearchParams(window.location.search);
    const bearName = params.get('bear');
    // const bearColor = params.get('color');
    const bear = bearName == null ? Bears[0] : Bears.find(bear => bear.name === bearName) ?? Bears[0];

    return [bear] as const;
}

export const setBearAndColorUrl = (bear: Bear, color: string) => {
    const params = new URLSearchParams({bear: bear.name, color});
    window.history.replaceState(null, '', `${window.location.origin}${window.location.pathname}?${params.toString()}`);    
}