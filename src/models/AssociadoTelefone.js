import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const AssociadoTelefone = sequelize.define("AssociadoTelefone", {
    COD: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    COD_ASSOCIADO: {
        type: DataTypes.INTEGER,
    },
    NUMERO: {
        type: DataTypes.STRING,
    },
    TIPO: {
        type: DataTypes.STRING, 
    }
}, {
    tableName: 'associados_telefones',
    timestamps: false
}); 