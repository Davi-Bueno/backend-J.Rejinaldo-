const models = require('../models/tarefaModel');
const tarefaModel = require('../models/tarefaModel');

const listar = (req, res) => {
  const resultado = tarefaModel.listar();
  res.json(resultado);
}

const buscarPeloId = (req, res) => {
  const resultado = tarefaModel.buscarPeloId(req.params.id);
  if (resultado !== null) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

const criar = (req, res) => {
  const resultado = tarefaModel.criar(req.body);
  res.status(201).json(resultado);
}

const atualizar = (req, res) => {
  const tarefaAtualizada = { ...req.body, id: req.params.id };
  const resultado = tarefaModel.atualizar(tarefaAtualizada);
  if (resultado !== null) {
    res.json(resultado);
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

const remover = (req, res) => {
  const resultado = tarefaModel.remover(req.params.id);
  if (resultado !== null) {
    res.status(204).send();
  } else {
    res.status(404).json({ msg: 'Tarefa não encontrada' });
  }
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };