import React from 'react';
import { render, cleanup, waitForElement, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import db from '../../../api/db.json';

afterEach(cleanup);

const url = (endpoint: string) => `http://localhost:3001/${endpoint}`;

test('App fetches data', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url('songs')).reply(200, db.songs);
  mock.onGet(url('artists')).reply(200, db.artists);
  mock.onGet(url('playlists')).reply(200, db.playlists);

  const { getByTestId } = render(
    <App />
  );

  const resolvedSongs = await waitForElement(() => getByTestId('songs-resolved'));
  expect(resolvedSongs).toHaveTextContent('songs');
  const resolvedArtists = await waitForElement(() => getByTestId('artists-resolved'));
  expect(resolvedArtists).toHaveTextContent('artists');
  const resolvedPlaylists = await waitForElement(() => getByTestId('playlists-resolved'));
  expect(resolvedPlaylists).toHaveTextContent('playlists');
});