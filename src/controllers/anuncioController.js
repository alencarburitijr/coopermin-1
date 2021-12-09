import { Anuncio, Produto, } from '../models/index.js';

import { validationResult, matchedData } from 'express-validator';
import sharp from 'sharp';
import { unlink } from 'fs/promises';

export const cadastraAnuncio = async (req, res) => {
    if(req.file) {
        await sharp(req.file.path)
            .resize(500)
            .toFormat('png')
            .toFile(`./public/img/${req.file.filename}.png`);
        await unlink(req.file.path);
    } else {
        res.status(400).json({ error: true, message: 'Arquivo Inválido' });
        return;
    }
    try {
       await Anuncio.create({
            COD_PRODUTO: req.body.cod_produto,
            IMG: `${req.file.filename}.png`
        });

        res.status(201).redirect('/anuncio/lista');
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
    
}

export const cadastraAnuncioGet = async (req, res) => {
    let produtos = await Produto.findAll();

    res.render('pages/cadastroAnuncio', { produtos } );
}

export const alteraAnuncio = async (req, res) => {
    let { cod_anuncio } = req.params;

    if(req.file) {
        await sharp(req.file.path)
            .resize(500)
            .toFormat('png')
            .toFile(`./public/img/${req.file.filename}.png`);
        await unlink(req.file.path);
    } else {
        res.status(400).json({ error: true, message: 'Arquivo Inválido' });
        return;
    }

    try {
        let anuncio = await Anuncio.findOne({
            attributes: ['COD_ANUNCIO', 'COD_PRODUTO', 'IMG'],
            where: { COD_ANUNCIO: cod_anuncio }
        });

        await unlink(`public/img/${anuncio.IMG}`); //apaga a img do anuncio antigo

        anuncio.COD_PRODUTO = req.body.cod_produto;
        anuncio.IMG = `${req.file.filename}.png`;

        await anuncio.save(); //salva as alterações

        res.redirect('/anuncio/lista');

    } catch(err) {
        res.json({ error: true, message: err.message })
    }
}

export const alteraAnuncioGet = async (req, res) => {
    let { cod_anuncio } = req.params;

    let anuncios = await Anuncio.findOne({
        where: { COD_ANUNCIO: cod_anuncio }, 
        attributes: ['COD_ANUNCIO', 'COD_PRODUTO', 'IMG'],
        include: [
            { model: Produto },
        ],
    });

    let produtos = await Produto.findAll();

    res.render('pages/alteraAnuncio', { anuncios, produtos });
}

export const listaAnuncios = async (req, res) => {
    try {
        let anuncios = await Anuncio.findAll({
            attributes: ['COD_ANUNCIO', 'COD_PRODUTO', 'IMG'],
            include: [
                { model: Produto },
            ],
        });

        res.render('pages/listaAnuncios', { anuncios } );
        //res.json( anuncios );
    } catch(err) {
        res.status(501).json({ error: true, message: err.message });
    }
}

export const deletaAnuncio = async (req, res) => {
    let { cod_anuncio } = req.params;

    try {
        let img = await Anuncio.findOne({where: {COD_ANUNCIO: cod_anuncio }, attributes: ['IMG']});
        await Anuncio.destroy({where: { COD_ANUNCIO: cod_anuncio } });
        
        await unlink(`public/img/${img.IMG}`);
        res.redirect('/anuncio/lista');
    } catch(err) {
        res.json({ error: true, message: err.message });
    }
}