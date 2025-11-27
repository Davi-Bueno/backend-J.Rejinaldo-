const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let usuarioId = '';
let token = '';

describe('Testes do recurso /usuarios', () => {
  test('POST /usuarios deve criar um usuário e retornar 201', async () => {
    const response = await request
      .post('/usuarios')
      .send({ email: 'usuario@email.com', senha: 'abcd1234' });
    
    expect(response.status).toBe(201);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('email', 'usuario@email.com');
    
    usuarioId = response.body._id;
  });

  test('POST /usuarios sem dados deve retornar 422', async () => {
    const response = await request.post('/usuarios');
    
    expect(response.status).toBe(422);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Email e Senha são obrigatórios');
  });

  test('POST /usuarios/login deve retornar 200 e um token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ usuario: 'usuario@email.com', senha: 'abcd1234' });
    
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
    
    token = response.body.token;
  });

  test('POST /usuarios/login sem dados deve retornar 401', async () => {
    const response = await request.post('/usuarios/login');
    
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Credenciais inválidas');
  });

  test('POST /usuarios/renovar com token válido deve retornar 200 e novo token', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
  });

  test('POST /usuarios/renovar com token inválido deve retornar 401', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', 'Bearer 123456789');
    
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('DELETE /usuarios/${id} com token válido deve retornar 204', async () => {
    const response = await request
      .delete(`/usuarios/${usuarioId}`)
      .set('authorization', token);
    
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });
});
