import React from 'react';
import './Song.scss';

export default function Song(props: {
  song: Song,
}) {
  const { song } = props;

  return (
    <div className="Song">{song.name}</div>
  );
};
