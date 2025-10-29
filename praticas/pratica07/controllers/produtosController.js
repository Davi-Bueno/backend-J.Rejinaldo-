var mongoose = require('mongoose');
var Produto = require('../models/produtoModel');

//criar 
const criar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    
    if (!nome || !preco) {
      return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }
    
    const novoProduto = await Produto.create({ nome, preco });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao criar produto', error: error.message });
  }
};

//listar
const listar = async (req, res) => {
  try {
    const produtosCadastrados = await Produto.find();
    res.status(200).json(produtosCadastrados);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao listar produtos', error: error.message });
  }
};

//buscar por id (middleware)
const buscar = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Parâmetro inválido' });
    }
    
    const produtoEncontrado = await Produto.findById(id);
    
    if (produtoEncontrado) {
      req.produto = produtoEncontrado;
      return next();
    }
    
    return res.status(404).json({ msg: 'Produto não encontrado' });
    
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao buscar produto', error: error.message });
  }
};

//exibir 
const exibir = async (req, res) => {
  res.status(200).json(req.produto);
};

//atualizar
const atualizar = async (req, res) => {
  try {
    const { nome, preco } = req.body;
    
    if (!nome || !preco) {
      return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }
    
    req.produto.nome = nome;
    req.produto.preco = preco;
    await req.produto.save();
    
    res.status(200).json(req.produto);
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao atualizar produto', error: error.message });
  }
};

//remover
const remover = async (req, res) => {
  try {
    await req.produto.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ msg: 'Erro ao remover produto', error: error.message });
  }
};

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover
};