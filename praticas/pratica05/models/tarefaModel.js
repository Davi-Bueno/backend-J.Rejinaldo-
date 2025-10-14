const tarefas = [];

const listar = () => {
  return tarefas;
}

const buscarPeloId = (tarefaId) => {
  const tarefa = tarefas.find(t => t.id === tarefaId);
  return tarefa || null;
}

const criar = (tarefa) => {
  const novaTarefa = {
    ...tarefa,
    id: Math.random().toString(36).substr(2, 4)
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
}

const atualizar = (tarefa) => {
  const index = tarefas.findIndex(t => t.id === tarefa.id);
  if (index !== -1) {
    tarefas[index] = { ...tarefas[index], ...tarefa };
    return tarefas[index];
  }
  return null;
}

const remover = (tarefaId) => {
  const index = tarefas.findIndex(t => t.id === tarefaId);
  if (index !== -1) {
    const tarefaRemovida = tarefas[index];
    tarefas.splice(index, 1);
    return tarefaRemovida;
  }
  return null;
}

module.exports = { listar, buscarPeloId, criar, atualizar, remover };