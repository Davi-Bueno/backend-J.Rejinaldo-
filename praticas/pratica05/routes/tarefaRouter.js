var express = require('express');
var tarefaController = require('../controllers/tarefaController');
var router = express.Router();


router.get('/',tarefaController.listar);
router.get('/:id',tarefaController.buscarPeloId);
router.post('/', tarefaController.criar);
router.put('/:id', tarefaController.atualizar);
router.delete('/:id', tarefaController.remover);

module.exports = router;