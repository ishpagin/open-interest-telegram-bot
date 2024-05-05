import {Config} from '../config';
import {User} from '../db/models/user';
import {getPUMPNotifications} from '../scrapper/aggregation';
import {bot} from '../index';
import {msToTime} from '../utils/msToTime';

const update = async() => {
    try {
        const activeUsers = await User.findAll({ where: { active: true } });

        for (const user of activeUsers) {
            const pumpNotifications = getPUMPNotifications(60000, 0.01, user.lastNotification);

            let text = '';

            if (pumpNotifications.length) {
                for (const notification of pumpNotifications) {
                    text += `💪 [${notification.symbol}](https://www.coinglass.com/tv/Binance_${notification.symbol}) \n`;
                    text += `Price delta: ${notification.percentDelta} \n`;
                    text += `Interval: ${msToTime(notification.interval)} \n`;
                }
            }

            if (text) {
                await bot.telegram.sendMessage(user.dataValues.chatId, text);
                await User.update({ lastNotification: Date.now() },
                    { where: { id: user.dataValues.id } },
                );
            }
        }

    } catch(e) {
        console.error(e);
    }
};

update();

setInterval(update, Config.NOTIFIER_INTERVAL);
