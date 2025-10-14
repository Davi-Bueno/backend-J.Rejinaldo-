const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);

let createdTaskId;

describe('API de Tarefas', () => {

  test('GET /tarefas deve retornar status 200 e conteúdo JSON', async () => {
    const response = await request
      .get('/tarefas')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('POST /tarefas deve criar uma nova tarefa e retornar status 201', async () => {
    const newTask = {
      "nome": "Estudar Node",
      "concluida": false
    };

    const response = await request
      .post('/tarefas')
      .send(newTask)
      .expect(201)
      .expect('Content-Type', /json/);

    createdTaskId = response.body.id;
    expect(createdTaskId).toBeDefined();
  });

  test('GET /tarefas/:id deve retornar uma tarefa específica com status 200', async () => {
    const response = await request
      .get(`/tarefas/${createdTaskId}`)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('GET /tarefas/1 deve retornar status 404 para tarefa inexistente', async () => {
    const response = await request
      .get('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('PUT /tarefas/:id deve atualizar uma tarefa e retornar status 200', async () => {
    const updatedTask = {
      "nome": "Estudar Node e Express",
      "concluida": true
    };

    const response = await request
      .put(`/tarefas/${createdTaskId}`)
      .send(updatedTask)
      .expect(200)
      .expect('Content-Type', /json/);
  });

  test('PUT /tarefas/1 deve retornar status 404 para tarefa inexistente', async () => {
    const updatedTask = {
      "nome": "Estudar Node e Express",
      "concluida": true
    };

    const response = await request
      .put('/tarefas/1')
      .send(updatedTask)
      .expect(404)
      .expect('Content-Type', /json/);
  });

  test('DELETE /tarefas/:id deve excluir uma tarefa e retornar status 204', async () => {
    const response = await request
      .delete(`/tarefas/${createdTaskId}`)
      .expect(204);
  });

  test('DELETE /tarefas/1 deve retornar status 404 para tarefa inexistente', async () => {
    const response = await request
      .delete('/tarefas/1')
      .expect(404)
      .expect('Content-Type', /json/);
  });

});