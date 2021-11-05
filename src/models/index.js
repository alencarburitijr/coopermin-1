import { Pedido } from "./Pedido.js";
import { PedidoItem } from "./PedidoItem.js";
import { Contrato } from "./Contrato.js";
import { ContratoItem } from "./ContratoItem.js";

/* Relacinamentos de tabelas do Sequelize */

Pedido.hasMany(PedidoItem, { foreignKey: 'COD_PEDIDO' });

Contrato.hasMany(ContratoItem, { foreignKey: 'COD_CONTRATO' });

PedidoItem.belongsTo(Pedido);

ContratoItem.belongsTo(Contrato);

export { Contrato, Pedido, ContratoItem, PedidoItem };