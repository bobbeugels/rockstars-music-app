import { url } from './'
import '@testing-library/jest-dom/extend-expect';

test('Url returns correct endpoint', () => {
  const link = url('songs');
  expect(link).toBe('http://localhost:3001/songs')
});

test('Url returns correct endpoint with id', () => {
  const link = url('playlists', 1);
  expect(link).toBe('http://localhost:3001/playlists/1')
});