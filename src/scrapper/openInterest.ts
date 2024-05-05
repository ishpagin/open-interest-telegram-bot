import {symbols} from './symbols';
import {Config} from '../config';
import {Timeline} from './aggregation';
import {delay} from '../utils/delay';

export const openInterests: Record<string, Timeline> = {};

const getOpenInterest = async(symbol: string) => {
    try {
        const res = await fetch(`https://fapi.binance.com/fapi/v1/openInterest?symbol=${symbol}`);
        const data = await res.json();

        return {
            value: data.openInterest,
            time: data.time,
        } as Timeline;
    } catch(e) {
        console.error(e);
    }
};
const update = async() => {
    for (const symbol of symbols) {
        const value = await getOpenInterest(symbol);

        await delay(500);

        if (value) {
            openInterests[symbol] = value;
        }
    }
};

setInterval(update, Config.OI_UPDATE_INTERVAL);
