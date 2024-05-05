import {Config} from '../config';

export let prices = [];

const update = async() => {
    try {
        const res = await fetch(`https://fapi.binance.com/fapi/v1/ticker/price`);
        prices = await res.json();
    } catch(e) {
        console.error(e);
    }
};

update();

setInterval(update, Config.PRICES_UPDATE_INTERVAL);
