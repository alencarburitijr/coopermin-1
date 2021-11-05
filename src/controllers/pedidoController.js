import { Pedido } from "../models/Pedido.js";

export const buscaPedidos = (req, res) => {
    res.json({ error: false, id_cliente: req.params.id_cliente});
}

export const buscaPedido = (req, res) => {
    res.json({ error: false, id_pedido: req.params.id_pedido});
}

export const buscaTodosPedidos = (req, res) => {
    res.json({ error: false, id_pedido: req.params.id_pedido});
}

export const adicionaPedido = (req, res) => {
    res.json({ error: false, id_pedido: req.params.id_pedido});
}

export const updatePedido = (req, res) => {
    res.json({ error: false, id_pedido: req.params.id_pedido});
}

export const deletePedido = (req, res) => {
    res.json({ error: false, id_pedido: req.params.id_pedido});
}