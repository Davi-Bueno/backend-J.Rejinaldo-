const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

let token = '';
let novoToken = '';

describe('Testes da API', () => {
  test('GET /produtos sem autorização deve retornar 401', async () => {
    const response = await request.get('/produtos');
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Não autorizado');
  });

  test('GET /produtos com token inválido deve retornar 401', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', 'Bearer 123456789');
    expect(response.status).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('msg', 'Token inválido');
  });

  test('POST /usuarios/login deve retornar 200 e um token', async () => {
    const response = await request
      .post('/usuarios/login')
      .send({ usuario: 'email@exemplo.com', senha: 'abcd1234' });
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  test('GET /produtos com token válido deve retornar 200', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });

  test('POST /usuarios/renovar deve retornar 200 e um novo token', async () => {
    const response = await request
      .post('/usuarios/renovar')
      .set('authorization', token);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('token');
    novoToken = response.body.token;
  });

  test('GET /produtos com novo token deve retornar 200', async () => {
    const response = await request
      .get('/produtos')
      .set('authorization', novoToken);
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
  });
});
