import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const Unidade = sequelize.define("Unidade", {
    COD: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    DESCRICAO: {
        type: DataTypes.STRING,
    },
    ALIAS: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'unidades',
    timestamps: false
});