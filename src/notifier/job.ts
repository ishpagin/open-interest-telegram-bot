import {Config} from '../config';
import {User} from '../db/models/user';
import {bot} from '../index';
import {msToTime} from '../utils/msToTime';
import {getPUMPNotifications} from '../scrapper/aggregation';

const update = async() => {
    try {
        const activeUsers = await User.findAll({ where: { active: true } });

        for (const user of activeUsers) {
            const pumpNotifications = getPUMPNotifications(120000, 1, user.lastNotification);

            if (pumpNotifications.length) {
                for (const notification of pumpNotifications) {
                    let text = '';

                    text += `💪 <b><a href='https://www.coinglass.com/tv/Binance_${notification.symbol}'>${notification.symbol}</a></b> \n`;
                    text += `Price delta: ${notification.percentDelta.toFixed(2)} % \n`;
                    text += `Time Interval: ${msToTime(notification.interval)} \n`;

                    await bot.telegram.sendMessage(user.dataValues.chatId,
                        text,
                        { parse_mode: 'HTML' },
                    );

                    await User.update({ lastNotification: notification.time },
                        { where: { id: user.dataValues.id } },
                    );
                }
            }

        }

    } catch(e) {
        console.error(e);
    }
};

update();

setInterval(update, Config.NOTIFIER_INTERVAL);
