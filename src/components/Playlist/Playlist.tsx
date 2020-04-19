import React from 'react';
import './Playlist.scss';

  export default function Playlist(props: {
  playlist: Playlist,
  destroyPlaylist: (id: number) => void,
}) {
  const remove = () => {
    props.destroyPlaylist(props.playlist.id)
  }

  return (
    <div className="Playlist">
      {props.playlist.name}
      <span className="Playlist__Delete" onClick={remove}>
        &times;
      </span>
    </div>
  );
};
