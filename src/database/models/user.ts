import {
    Model,
    DataTypes,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyAddAssociationMixin,
    BelongsToManyHasAssociationMixin,
    BelongsToManyCountAssociationsMixin,
    BelongsToManyCreateAssociationMixin
} from 'sequelize';
import { sequelize } from './index'
import { BrdGameAttributes, BrdGame } from './brdGame'
import { Users_BrdGames } from './users_brdgames';

export interface UserAttributes extends Model {
    user_id: number
    email: string;
    password: string;

    createdAt: Date
    updatedAt: Date

    getBg: BelongsToManyGetAssociationsMixin<BrdGameAttributes>; // Note the null assertions!
    addBg: BelongsToManyAddAssociationMixin<BrdGameAttributes, number>;
    hasBg: BelongsToManyHasAssociationMixin<BrdGameAttributes, number>;
    countBg: BelongsToManyCountAssociationsMixin;
    createBg: BelongsToManyCreateAssociationMixin<BrdGameAttributes>;


}

export type UserModel = typeof Model & {
    new(): UserAttributes
}

export const User = <UserModel>sequelize.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    email: DataTypes.STRING,
    password: DataTypes.STRING


});
User.belongsToMany(BrdGame, { through: Users_BrdGames })


