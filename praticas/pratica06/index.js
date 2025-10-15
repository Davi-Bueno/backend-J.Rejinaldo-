const readline = require('readline-sync');
const controlador = require('./controlador.js');

function menu() {
  console.log('\n=== MENU DE TAREFAS ===');
  console.log('1 - Adicionar contato');
  console.log('2 - Buscar contato');
  console.log('3 - Atualizar contato');
  console.log('4 - Remover contato');
  console.log('5 - Sair');
  //delimitador
  console.log('=====================');
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case '1':
      const nomeAdicionar = readline.question('Digite o nome da tarefa: ');
      await controlador.adicionarTarefa(nomeAdicionar);
      console.log('Tarefa adicionada com sucesso!');
      break;

    case '2':
      const nomeBuscar = readline.question('Digite o nome da tarefa: ');
      const tarefaEncontrada = await controlador.buscarTarefa(nomeBuscar);
      if (tarefaEncontrada.id) {
        console.log('Tarefa encontrada:');
        console.log(`ID: ${tarefaEncontrada.id}`);
        console.log(`Nome: ${tarefaEncontrada.nome}`);
        console.log(`Concluída: ${tarefaEncontrada.concluida}`);
      } else {
        console.log('Tarefa não encontrada!');
      }
      break;

    case '3':
      const nomeAtualizar = readline.question('Digite o nome da tarefa: ');
      const concluida = readline.question('Tarefa concluída? (true/false): ') === 'true';
      await controlador.atualizarTarefa(nomeAtualizar, concluida);
      console.log('Tarefa atualizada com sucesso!');
      break;

    case '4':
      const nomeRemover = readline.question('Digite o nome da tarefa: ');
      await controlador.removerTarefa(nomeRemover);
      console.log('Tarefa removida com sucesso!');
      break;

    case '5':
      console.log('Encerrando o programa...');
      process.exit();
      break;

    default:
      console.log('Opção inválida! Tente novamente.');
      break;
  }
}

async function main() {
  while (true) {
    try {
      menu();
      const opcao = readline.question('Escolha uma opção: ');
      await escolherOpcao(opcao);
    } catch (error) {
      console.error('Erro:', error.message);
    }
  }
}

main();