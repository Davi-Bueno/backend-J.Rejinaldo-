var supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app')
const request = supertest(app);

//var temp global para armazenar id do produto criado
let idProdutoCriado;

// desconectar do MongoDB após rodar todos os testes
afterAll(async () => {
  await mongoose.connection.close();
  console.log('Conexão MongoDB fechada');
});

describe('Testes da API de /produtos', () => {

  //POST 
  
    test('POST /produtos deve cadastrar um novo produto', async () => {
      const novoProduto = { nome: 'Laranja', preco: 10.0 };
      const response = await request.post('/produtos').send(novoProduto);
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('_id');
      expect(response.body.nome).toBe('Laranja');
      expect(response.body.preco).toBe(10.0);
      idProdutoCriado = response.body._id;
    });

    test('POST /produtos sem JSON deve retornar erro 422', async () => {
      const response = await request.post('/produtos').send({});
      expect(response.status).toBe(422);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });


  //GET 
  
    test('GET /produtos retorna 200,conteudo tipo json e [] de {}', async () => {
      const response = await request.get('/produtos');
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /produtos/${id} retorna 200, conteudo tipo json com propriedades __id,nome e preco', async () => {
      const response = await request.get(`/produtos/${idProdutoCriado}`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('nome');
      expect(response.body).toHaveProperty('preco');
    });

    test('GET /produtos/0 retornar 400 e conteudo tipo json contendo msg igual a "Parâmetro inválido"', async () => {
      const response = await request.get('/produtos/0');
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('GET /produtos/000000000000000000000000 retornar 404 e conteudo tipo json contendo msg igual a "Produto não encontrado"', async () => {
      const response = await request.get('/produtos/000000000000000000000000');
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Produto não encontrado');
    });


  //PUT
  
    test('PUT /produtos/${id} com json {nome: "Laranja", preco: 18}, retornar 200 e o conteudo do tipo json com as propriedades _id, nome e preco', async () => {
      const response = await request.put(`/produtos/${idProdutoCriado}`).send({ nome: "Laranja", preco: 18 });

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('_id');
      expect(response.body.nome).toBe('Laranja');
      expect(response.body.preco).toBe(18);
    });

    test('PUT /produtos/${id} sem JSON deve retornar erro 422', async () => {
      const response = await request.put(`/produtos/${idProdutoCriado}`).send({});
      expect(response.status).toBe(422);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
    });

    test('PUT /produtos/0 deve retornar erro 400', async () => {
      const response = await request.put('/produtos/0').send({ nome: "Teste", preco: 10 });
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('PUT /produtos/000000000000000000000000 deve retornar erro 404', async () => {
      const response = await request.put('/produtos/000000000000000000000000').send({ nome: "Teste", preco: 10 });
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Produto não encontrado');
    });
  

  //DELETE 
 
    test('DELETE /produtos/0 deve retornar erro 400', async () => {
      const response = await request.delete('/produtos/0');
      expect(response.status).toBe(400);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Parâmetro inválido');
    });

    test('DELETE /produtos/${id} deve retornar 204', async () => {
      const response = await request.delete(`/produtos/${idProdutoCriado}`);
      expect(response.status).toBe(204);
    });

    test('DELETE /produtos/${id} deve retornar erro 404 ', async () => {
      const response = await request.delete(`/produtos/${idProdutoCriado}`);
      expect(response.status).toBe(404);
      expect(response.headers['content-type']).toContain('application/json');
      expect(response.body).toHaveProperty('msg');
      expect(response.body.msg).toBe('Produto não encontrado');
    });
  });

