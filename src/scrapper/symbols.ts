import {Config} from '../config';

export let symbols = [];

const update = async() => {
    try {
        const res = await fetch(`https://fapi.binance.com/fapi/v1/exchangeInfo`);
        const symbolsRaw = await res.json();

        symbols = [];

        symbolsRaw.symbols.forEach(elem => {
            symbols.push(elem.symbol);
        });
    } catch(e) {
        console.error(e);

        setTimeout(update, 5000);
    }
};

update();

setInterval(update, Config.SYMBOLS_UPDATE_INTERVAL);
