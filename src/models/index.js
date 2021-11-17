import { Pedido } from "./Pedido.js";
import { PedidoItem } from "./PedidoItem.js";
import { Contrato } from "./Contrato.js";
import { ContratoItem } from "./ContratoItem.js";
import { Associado } from "./Associado.js";
import { Usuario } from "./Usuario.js";
import { AssociadoTelefone } from './AssociadoTelefone.js';
import { Cliente } from './Cliente.js';

/* Relacionamentos de tabelas do Sequelize */

Pedido.hasMany(PedidoItem, { foreignKey: 'COD_PEDIDO' });

Contrato.hasMany(ContratoItem, { foreignKey: 'COD_CONTRATO' });

Cliente.hasMany(Contrato, { foreignKey: 'COD_CLIENTE' });

Associado.hasMany(Contrato, { foreignKey: 'COD_ASSOCIADO' })

Associado.hasMany(Usuario, { foreignKey: 'COD_ASSOCIADO' });

Associado.hasMany(AssociadoTelefone, { foreignKey: 'COD_ASSOCIADO' });

AssociadoTelefone.belongsTo(Associado);

Contrato.belongsTo(Associado);

Contrato.belongsTo(Cliente);

Usuario.belongsTo(Associado);

PedidoItem.belongsTo(Pedido);

ContratoItem.belongsTo(Contrato);

export { Contrato, Pedido, ContratoItem, PedidoItem, Associado, AssociadoTelefone, Usuario, Cliente };