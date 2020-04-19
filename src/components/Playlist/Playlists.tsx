import React, { useState } from 'react';

export default function Playlists(props: {
  children: React.ReactNode,
  createPlaylist: (name: string) => void
}) {
  const [playlistName, setPlaylistName] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setPlaylistName(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const {createPlaylist } = props;

    if (playlistName) {
      createPlaylist(playlistName);
      setPlaylistName('');
    }
  };

  return (
    <section className="Playlists">
      <h2>Playlists</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Playlist name:
          <input
            value={playlistName}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {props.children}
    </section>
  );
}