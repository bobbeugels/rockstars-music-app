import React from 'react';
import { useParams } from 'react-router-dom';

export default function ArtistDetail(props: {
  findArtistById: (id: number) => Artist,
  findSongsByArtist: (artist: string) => Song[] | [] 
}) {
  const { findArtistById, findSongsByArtist } = props;
  const { id } = useParams();

  const artist = findArtistById(Number(id));
  const songs = findSongsByArtist(artist.name) as Song[];

  if (artist) {
    return (
      <div className="ArtistDetail">
        <h1>{artist.name}</h1>
        {
          songs.length > 0 ? (
            songs
              .map((song: Song) => (
                <div key={song.id}>{song.name}</div>
              ))
          ) : (
            <div>No songs found</div>
          )
        }
      </div>
    );
  }
  return (
    <div className="ArtistDetail">
      Artist not found
    </div>
  )
}
