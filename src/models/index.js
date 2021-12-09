import { Pedido } from "./Pedido.js";
import { PedidoItem } from "./PedidoItem.js";
import { Contrato } from "./Contrato.js";
import { ContratoItem } from "./ContratoItem.js";
import { Associado } from "./Associado.js";
import { Usuario } from "./Usuario.js";
import { AssociadoTelefone } from './AssociadoTelefone.js';
import { Cliente } from './Cliente.js';
import { Produto } from './Produto.js';
import { Anuncio } from './Anuncio.js';

/* Relacionamentos de tabelas do Sequelize */

Pedido.hasMany(PedidoItem, { foreignKey: 'COD_PEDIDO' });

Contrato.hasMany(ContratoItem);

Cliente.hasMany(Contrato);

Associado.hasMany(Contrato)

Associado.hasMany(Usuario);

Associado.hasMany(AssociadoTelefone, { foreignKey: 'COD_ASSOCIADO' });

Produto.hasMany(Anuncio);

Anuncio.belongsTo(Produto, { foreignKey: 'COD_PRODUTO' });

AssociadoTelefone.belongsTo(Associado);

Contrato.belongsTo(Associado, { foreignKey: 'COD_ASSOCIADO' });

Contrato.belongsTo(Cliente, { foreignKey: 'COD_CLIENTE' });

Usuario.belongsTo(Associado, { foreignKey: 'COD_ASSOCIADO' });

PedidoItem.belongsTo(Pedido);

ContratoItem.belongsTo(Contrato, { foreignKey: 'COD_CONTRATO', foreignKeyConstraint: true });

export { Contrato, Pedido, ContratoItem, PedidoItem, Associado, AssociadoTelefone, Usuario, Cliente, Produto, Anuncio };