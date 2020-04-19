import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import { Artist, Artists, ArtistDetail } from '../Artist';
import { Playlists, Playlist } from '../Playlist';
import { randomInt, url } from '../../utilities';
import './App.scss';

export default function App() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState(20);

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

  useEffect(() => {
    const fetchData = () => {
      const request = (endpoint: string) => axios.get(url(endpoint));
      const requests = ['artists', 'playlists']
        .map((endpoint: string) =>
          request(endpoint));
  
      const setStates = [setArtists, setPlaylists];
  
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

    fetchData();
  }, [])

  const findArtistById = (id: number): Artist =>
    artists.find(artist => artist.id === id)!;

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
      const newPlaylists = playlists
        .filter(playlist => playlist.id !== id);
      setPlaylists(newPlaylists);
    }
    deletePlaylist(id);
  };

  const loadMoreResults = () => {
    setResults(results + 20);
  }

  return (
    <main className="App">
      {error && <div data-testid="error">Failed to load data</div>}
      {
        (artists.length > 0) && (
          <React.Fragment>
            <Playlists createPlaylist={createPlaylist}>
              {
                playlists.map(playlist => (
                  <Playlist
                    key={playlist.id}
                    destroyPlaylist={destroyPlaylist}
                    playlist={playlist}
                  />
                ))
              }
            </Playlists>
            <section className="Content">
              <Switch>
                <Route exact path="/">
                  {
                    artists.length > 0 && (
                      <Artists searchQuery={searchQuery} handleSearchInput={handleSearchInput}>
                        {
                          artists
                            .filter((artist: Artist) => {
                              const regex = new RegExp(searchQuery, 'i');
                              return artist.name.match(regex);
                            })
                            .slice(0, results)
                            .map((artist: Artist) => (
                              <Artist key={artist.id} {...artist} />
                            ))
                        }
                        <button
                          className='Artists__LoadMore' 
                          onClick={loadMoreResults}
                        >
                          Load more
                        </button>
                      </Artists>
                    )
                  }
                </Route>
                <Route path="/artists/:id">
                  {
                    artists.length > 0 && (
                      <ArtistDetail
                        findArtistById={findArtistById}
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