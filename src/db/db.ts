import {Sequelize} from 'sequelize';
import {Config} from '../config';

// Создаем новый экземпляр Sequelize с настройками для SQLite
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: Config.DB_PATH, // Путь к файлу базы данных SQLite
});
