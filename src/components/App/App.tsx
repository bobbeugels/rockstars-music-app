import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { Artist, ArtistDetail } from '../Artist';
import url from '../../utilities/url';
import './App.scss';

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState('');

  const fetchData = () => {
    const request = (endpoint: string) => axios.get(url(endpoint));
    const requests = ['songs', 'artists', 'playlists']
      .map((endpoint: string) =>
        request(endpoint));

    const setStates = [setSongs, setArtists, setPlaylists];

    axios
      .all(requests)
      .then(
        axios
        .spread((...responses) => {
          setStates.map((func, i) =>
            func(responses[i].data));
        })
      )
      .catch(error => {
        setError(error);
      })
  }

  const findArtistById = (id: number): Artist =>
    artists.find(artist => artist.id === id)!;

  const findSongsByArtist = (artist: string): Song[] | [] =>
    songs.filter(song => song.artist === artist);

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      {error && <div data-testid="error">Failed to load data</div>}
      {songs.length > 0 && <div data-testid="songs-resolved">songs</div>}
      {playlists.length > 0 && <div data-testid="playlists-resolved">playlists</div>}
      <Switch>
        <Route exact path="/">
          {
            artists.length > 0 && (
              <div data-testid="artists-resolved">
                <h2>
                  Artists:
                </h2>
                {
                  artists
                    .map((artist: Artist) => (
                      <Artist key={artist.id} {...artist} />
                    ))
                }
              </div>
            )
          }
        </Route>
        <Route path="/artists/:id">
          {
            artists.length && (
              <ArtistDetail
                findArtistById={findArtistById}
                findSongsByArtist={findSongsByArtist}
              />
            )
          }
        </Route>
        <Route path="*">
          <div data-testid="page-not-found">
            404: Page not found
          </div>
        </Route>
      </Switch>
    </div>
  );
}