const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());

const PORT = 3000;

//bd
const tarefas = [  
  { id: 1, nome: "Estudar middleware", concluida: false },  
  { id: 2, nome: "Praticar Express", concluida: true }  
];


app.use('/', (req, res, next) => {
 console.log(req.method, req.url, Date.now());
 next(); 
});

//mid global
app.use('/', router);

//get
router.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

//post
router.post('/tarefas', (req, res) => {
  const { nome, concluida } = req.body;
    const novaTarefa = { id: tarefas.length + 1, nome, concluida };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

//get id
router.get('/tarefas/:id', (req, res, next) => {
  const { id } = req.params;
  const tarefa = tarefas.find(t => t.id === parseInt(id));
  
  if (!tarefa) {
    const error = new Error('Tarefa não localizada');
    return next(error);
  }
  
  res.json(tarefa);
});

router.put('/tarefas/:id', (req, res, next) => {
  const { id } = req.params;
  const { nome, concluida } = req.body;
  const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));
  
  if (tarefaIndex === -1) {
    const error = new Error('Tarefa não localizada');
    return next(error);
  }
  
  tarefas[tarefaIndex] = { id: parseInt(id), nome, concluida };
  res.json(tarefas[tarefaIndex]);
});

router.delete('/tarefas/:id', (req, res, next) => {
  const { id } = req.params;
  const tarefaIndex = tarefas.findIndex(t => t.id === parseInt(id));
  
  if (tarefaIndex === -1) {
    const error = new Error('Tarefa não localizada');
    return next(error);
  }
  
  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

// mid error 
app.use((error, req, res, next) => {
  console.error('Erro capturado:', error.message);
  
  res.status(400).json({
    error: error.message
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


module.exports = { app, tarefas };