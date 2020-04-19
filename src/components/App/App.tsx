import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';

export default function App() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const fetchData = () => {
    const request = (endpoint: string) => 
      axios.get(`http://localhost:3001/${endpoint}`);

    const requests = ['songs', 'artists', 'playlists']
      .map((endpoint: string) =>
        request(endpoint));

    const setStates = [setSongs, setArtists, setPlaylists];

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setStates.map((func, i) =>
            func(responses[i].data));
        })
      )
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="App">
      {songs && <div data-testid="songs-resolved">songs</div>}
      {artists && <div data-testid="artists-resolved">artists</div>}
      {playlists && <div data-testid="playlists-resolved">playlists</div>}
    </div>
  );
}
