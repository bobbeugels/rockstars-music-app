import React from 'react';
import './Artists.scss';

export default function Artists(props: {
  children: React.ReactNode,
  searchQuery: string,
  handleSearchInput: (event: React.FormEvent<HTMLInputElement>) => void
}) {
  const { searchQuery, handleSearchInput } = props;

  return (
    <div className='Artists'>
      <h2 className='Artists__Heading' data-testid="artists-resolved">Artists</h2>
      <input
        className='Artists__Input'
        data-testid="artist-search"
        placeholder="Search in Artists"
        value={searchQuery}
        onChange={handleSearchInput}
      />
      {props.children}
    </div>
  );
};
