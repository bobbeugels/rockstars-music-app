import { randomInt } from './'
import '@testing-library/jest-dom/extend-expect';

test('RandomInt returns a value equal to or between min and max value', () => {
  const int = randomInt(0, 1);
  expect(int).toBeLessThanOrEqual(1);
  expect(int).toBeGreaterThanOrEqual(0);
});