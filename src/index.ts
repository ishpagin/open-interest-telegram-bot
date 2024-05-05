import {Telegraf} from 'telegraf';
import {message} from 'telegraf/filters';
import {Config} from './config';
import {start} from './commands/start';
import {stop} from './commands/stop';
import {getSettings} from './commands/get-settings';

export const bot = new Telegraf(Config.BOT_TOKEN);

bot.command('start', start);
bot.command('stop', stop);
bot.command('getsettings', getSettings);

bot.on(message('text'), async(ctx) => {
    await ctx.reply(`Hello ${ctx.from.username}`);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
