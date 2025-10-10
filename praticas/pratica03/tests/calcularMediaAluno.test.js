const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('calcularMediaAluno - existência', () => {
  test('deve estar definido', () => {
    expect(calcularMediaAluno).toBeDefined();
  });
});

describe('calcularMediaAluno - validação de parâmetros', () => {
  test.each([
    [undefined, 7, 8],
    [6, undefined, 8]
  ])('deve lançar erro quando %s estiver indefinido', (a1, a2, a3) => {
    expect(() => calcularMediaAluno(a1, a2, a3)).toThrow();
  });
});

describe('CalcularmediaAluno a1 ou a2 negativos', () => {
  test.each([
    [-1, 7, 8],
    [6, -1, 8]
  ])('deve lançar erro quando %s for negativo', (a1, a2, a3) => {
    expect(() => calcularMediaAluno(a1, a2, a3)).toThrow();
  });
});

describe('calcularMediaAluno - cálculo base quando a3 não informada', () => {
  test.each([
    [7, 8, undefined, 7*0.4 + 8*0.6],
    [6, 9, undefined, 6*0.4 + 9*0.6]
  ])('deve calcular a média de a1 e a2 quando a3 não é informada', (a1, a2, a3, resultadoEsperado) => {
    expect(calcularMediaAluno(a1, a2, a3)).toBe(resultadoEsperado);
  });
});

describe('calcularMediaAluno - a3 negativo', () => {
  test('deve lançar erro quando a3 é negativo', () => {
    expect(() => calcularMediaAluno(7, 8, -1)).toThrow();
  });
});

describe('calcularMediaAluno - a3 informada e a melhor combinação é a1 com a3', () => {
  test.each([
    [7, 5, 9, (7*0.4 + 9*0.6)], 
    [6, 4, 8, (6*0.4 + 8*0.6)]
  ])('deve calcular a média de a1 e a3 quando esta é a melhor combinação', (a1, a2, a3, resultadoEsperado) => {
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(resultadoEsperado);
  });
});

describe ('calcularMediaAluno - a3 informada e a melhor combinação é a2 com a3', () => {
  test.each([
    [5, 7, 9, (7*0.4 + 9*0.6)],
    [4, 6, 8, (6*0.4 + 8*0.6)]
  ])('deve calcular a média de a2 e a3 quando esta é a melhor combinação', (a1, a2, a3, resultadoEsperado) => {
    expect(calcularMediaAluno(a1, a2, a3)).toBeCloseTo(resultadoEsperado);
  });
});
