import {Context} from 'telegraf';
import {User} from '../db/models/user';

export async function getSettings(ctx: Context) {
    try {
        const user = await User.findOne({
            where: {
                chatId: ctx.chat.id,
            },
        });

        if (!user) {
            return ctx.reply('No user found');
        }

        ctx.reply(user.settings);

    } catch(e) {
        console.error(e);

        ctx.reply(`Error: ${e.toString()}`);
    }

}
