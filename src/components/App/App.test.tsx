import React from 'react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import db from '../../../api/db.json';

afterEach(cleanup);

const url = (endpoint: string) => `http://localhost:3001/${endpoint}`;
const history = createMemoryHistory();

test('App fetches data', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url('songs')).reply(200, db.songs);
  mock.onGet(url('artists')).reply(200, db.artists);
  mock.onGet(url('playlists')).reply(200, db.playlists);

  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  const resolvedSongs = await waitForElement(() => getByTestId('songs-resolved'));
  expect(resolvedSongs).toHaveTextContent('songs');
  const resolvedArtists = await waitForElement(() => getByTestId('artists-resolved'));
  expect(resolvedArtists).toHaveTextContent('Artists:');
  const resolvedPlaylists = await waitForElement(() => getByTestId('playlists-resolved'));
  expect(resolvedPlaylists).toHaveTextContent('playlists');
});

test('App throws error when fails to load data', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url('songs')).reply(404);
  mock.onGet(url('artists')).reply(404);
  mock.onGet(url('playlists')).reply(404);

  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  const resolvedSongs = await waitForElement(() => getByTestId('error'));
  expect(resolvedSongs).toHaveTextContent('Failed to load data');
});

test('Search works properly', async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(url('songs')).reply(200, db.songs);
  mock.onGet(url('artists')).reply(200, db.artists);
  mock.onGet(url('playlists')).reply(200, db.playlists);

  const { getByTestId, queryByText } = render(
    <Router history={history}>
      <App />
    </Router>
  );

  const artistSearch = await waitForElement(() => getByTestId('artist-search'));
  fireEvent.change(artistSearch, { target: { value: '30 Seconds to Mars' } })

  expect(queryByText('30 Seconds to Mars')).toBeInTheDocument();
  expect(queryByText('Ace of Base')).toBeNull();
});

test('Landing on a bad page shows 404 page', async () => {
  history.push('/bad/route')

  const { getByTestId } = render(
    <Router history={history}>
      <App />
    </Router>
  )

  const resolvedSongs = await waitForElement(() => getByTestId('page-not-found'));
  expect(resolvedSongs).toHaveTextContent('404: Page not found')
});