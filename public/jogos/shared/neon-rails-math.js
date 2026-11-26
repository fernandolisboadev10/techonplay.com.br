const basicOperations = ['+', '−'];
const allOperations = [...basicOperations, '×', '÷'];
const levels = {
  1: { operations: basicOperations, limit: 10 },
  2: { operations: basicOperations, limit: 50 },
  3: { operations: allOperations, limit: 99, factor: 5, table: 5 },
  4: { operations: allOperations, limit: 200, factor: 9, table: 9 },
  5: { operations: allOperations, limit: 999, factor: 15, table: 10 },
};

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function createExpression(operator, level) {
  switch (operator) {
    case '+': {
      const a = randomInt(1, level.limit - 1);
      const b = randomInt(1, level.limit - a);
      return { a, b, answer: a + b };
    }
    case '−': {
      const a = randomInt(2, level.limit);
      const b = randomInt(1, a);
      return { a, b, answer: a - b };
    }
    case '×': {
      const a = randomInt(2, level.factor);
      const b = randomInt(2, level.table);
      return { a, b, answer: a * b };
    }
    case '÷': {
      const answer = randomInt(2, level.factor);
      const b = randomInt(2, level.table);
      return { a: answer * b, b, answer };
    }
  }
}

export function createRailCheckpoint(grade, index) {
  const level = levels[grade];
  const operator = level.operations[index % level.operations.length];
  const { a, b, answer } = createExpression(operator, level);
  const expression = `${a} ${operator} ${b}`;
  const step = operator === '×' ? b : 1;
  const alternatives = [-3, -2, -1, 1, 2, 3]
    .map((offset) => answer + offset * step)
    .filter((value) => value >= 0 && value <= level.limit);
  const first = alternatives.splice(randomInt(0, alternatives.length - 1), 1)[0];
  const second = alternatives[randomInt(0, alternatives.length - 1)];
  const values = [answer, first, second];
  const lane = randomInt(0, values.length - 1);
  [values[0], values[lane]] = [values[lane], values[0]];

  return { prompt: `${expression} = ?`, values, lane, explanation: `${expression} = ${answer}.` };
}
