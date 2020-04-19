import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtistDetail.scss';
import { Song } from '../Song';
import { url } from '../../utilities';

export default function ArtistDetail(props: {
  findArtistById: (id: number) => Artist,
}) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState('');
  const { findArtistById } = props;
  const { id } = useParams();

  const artist = findArtistById(Number(id));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `?artist=${artist.name}`
        const results = await axios.get(url('songs') + encodeURI(query));
  
        setSongs(results.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [artist.name])

  if (artist) {
    return (
      <div className="ArtistDetail">
        <h1 className="ArtistDetail__Heading">
          {artist.name}
        </h1>
        {
          songs.length > 0 ? (
            songs
              .map((song: Song) => (
                <Song key={song.id} song={song} />
              ))
          ) : (
            error ? (
              <div>Error</div>
            ) : (
              <div>No songs found</div>
            )
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
