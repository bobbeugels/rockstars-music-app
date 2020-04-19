import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { Artist, ArtistDetail } from '../Artist';
import { Playlists, Playlist } from '../Playlist';
import { randomInt, url } from '../../utilities';
import './App.scss';

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const postPlaylist = async (playlist: Playlist) => {
    try {
      await axios.post(url('playlists'), playlist);
    } catch (error) {
      setError(error);
    }
  }

  const deletePlaylist = async (id: number) => {
    try {
      await axios.delete(url('playlists', id));
    } catch (error) {
      setError(error);
    }
  }

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

  useEffect(() => {
    fetchData();
  }, [])

  const findArtistById = (id: number): Artist =>
    artists.find(artist => artist.id === id)!;

  const findSongsByArtist = (artist: string): Song[] | [] =>
    songs.filter(song => song.artist === artist);

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchQuery(event.currentTarget.value);
  };

  const createPlaylist = (name: string): void => {
    const playlist = {
      name,
      id: randomInt(0, 1000),
      songs: [],
    };

    const newPlaylists = [
      ...playlists,
      playlist,
    ];
    
    setPlaylists(newPlaylists);
    postPlaylist(playlist);
  };

  const destroyPlaylist = (id: number): void => {
    if (playlists) {
      const newPlaylists = playlists.filter(playlist => playlist.id !== id);
      setPlaylists(newPlaylists);
    }
    deletePlaylist(id);
  };

  return (
    <main className="App">
      {error && <div data-testid="error">Failed to load data</div>}
      {
        songs.length && artists.length && (
          <React.Fragment>
            {songs.length > 0 && <div data-testid="songs-resolved">songs</div>}
            <Playlists createPlaylist={createPlaylist}>
              {
                playlists.map(playlist => (
                  <Playlist destroyPlaylist={destroyPlaylist} playlist={playlist} />
                ))
              }
            </Playlists>
            <section className="Content">
              <Switch>
                <Route exact path="/">
                  {
                    artists.length > 0 && (
                      <div data-testid="artists-resolved">
                        <input
                          data-testid="artist-search"
                          placeholder="Search in Artists"
                          value={searchQuery}
                          onChange={handleSearchInput}
                        />
                        <h2>
                          Artists:
                        </h2>
                        {
                          artists
                            .filter((artist: Artist) => {
                              const regex = new RegExp(searchQuery, 'i');
                              return artist.name.match(regex);
                            })
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
            </section>
          </React.Fragment>
        )
      }
    </main>
  );
}