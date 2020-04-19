import React, { useState } from 'react';
import './Playlists.scss';

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
      <h2 className="Playlists__Heading">Playlists</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="Playlists__Input"
          placeholder='Add playlist'
          value={playlistName}
          onChange={handleChange}
        />
      </form>
      {props.children}
    </section>
  );
}