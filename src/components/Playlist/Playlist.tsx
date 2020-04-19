import React from 'react';

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
      <span className="Playlist__delete" onClick={remove}>
        x
      </span>
    </div>
  );
};
