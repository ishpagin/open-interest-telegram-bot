import {Sequelize} from 'sequelize';
import {Config} from '../config';

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: Config.DB_PATH,
    logging: false,
});
