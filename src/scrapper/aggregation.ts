import {symbols} from './symbols';
import {openInterests} from './openInterest';
import {Config} from '../config';
import {prices} from './prices';

export interface Timeline
{
    value: number;
    time: number;
}

interface SymbolInfo
{
    openInterests: Timeline[];
    prices: Timeline[];
}

export const symbolsInfo: Record<symbol, SymbolInfo> = {};

const update = async() => {
    for (const symbol of symbols) {
        symbolsInfo[symbol] ??= {
            openInterests: [],
            prices: [],
        };

        addTimeline(symbolsInfo[symbol].openInterests, openInterests[symbol]);
        const price = prices.find((p) => p.symbol === symbol);
        if (price) {
            addTimeline(symbolsInfo[symbol].prices, {
                time: price.time,
                value: price.price,
            });
        }
    }
};

const addTimeline = (timeline: Timeline[], entry: Timeline) => {
    if (!entry) {
        return;
    }

    if (timeline[0]?.time === entry.time) {
        return;
    }

    timeline.unshift(entry);

    if (timeline.length > Config.MAX_TIMELINE_ENTRIES) {
        timeline.pop();
    }
};

update();

setInterval(update, 1000);

const getTimelinePercentDelta = (timeline: Timeline[], interval = 60000, timeFrom = 0) => {
    timeline = timeline.filter(({ time }) => time > timeFrom);

    if (timeline.length < 2) {
        return;
    }

    const currentValue = timeline[0].value;
    const lastTime = timeline[0].time;
    const nearestTimeToCheck = lastTime - interval;

    let candidate = timeline[0];

    for (const entry of timeline) {
        if (entry.time > nearestTimeToCheck) {
            candidate = entry;
        } else {
            break;
        }
    }

    return {
        percentDelta: (
            currentValue - candidate.value
        ) / candidate.value,
        interval: lastTime - candidate.time,
        time: lastTime,
    };
};

export const getPUMPNotifications = (interval = 60000, gap = 0.1, timeFrom = 0): {
    symbol: string, percentDelta: number, interval: number, time: number
}[] => {
    const notifications = [];
    for (const symbol of symbols) {
        const result = getTimelinePercentDelta(symbolsInfo[symbol].prices, interval, timeFrom);

        if (result && Math.abs(result.percentDelta) > gap) {
            notifications.push({
                symbol, ...result,
            });
        }
    }

    return notifications;
};
