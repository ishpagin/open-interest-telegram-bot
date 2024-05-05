import {Context} from 'telegraf';
import {User} from '../db/models/user';

export async function start(ctx: Context) {
    try {
        await User.upsert({
            username: ctx.from.username,
            chatId: ctx.chat.id,
            active: true,
        });
    } catch(e) {
        console.error(e);
    }

    ctx.reply('Activated.');
}
