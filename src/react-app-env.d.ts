/// <reference types="react-scripts" />

type Song = {
  id: number,
  name: string,
  year: number,
  artist: string,
  shortname: string,
  bpm: number,
  duration: number,
  genre: string,
  spotifyId: string,
  album: string,
};

type Artist = {
  id: number,
  name: string,
  songs: number[]
};

type Playlist = {
  id: number,
  name: string,
  songs: number[]
};