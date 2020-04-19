import url from './url'
import '@testing-library/jest-dom/extend-expect';

test('Request returns correct url', () => {
  const link = url('songs');
  expect(link).toBe('http://localhost:3001/songs')
})