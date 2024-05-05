import {DataTypes, Model} from 'sequelize';
import {sequelize} from '../db';

export class User extends Model
{
    public id!: number;
    public username!: string;
    public chatId!: number;
    public lastNotification!: number;
    public active!: boolean;
    public settings!: any;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    chatId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    lastNotification: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
    },
    settings: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
    },
}, {
    sequelize,
    modelName: 'User',
});

User.sync({ alter: true });
