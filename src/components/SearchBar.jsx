import React, { useState } from 'react';

const SearchBar = ({ data, setActiveArrondissement }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      const found = data.find(item =>
        item.properties.l_ar.toLowerCase().includes(value.toLowerCase()) ||
        item.properties.l_aroff.toLowerCase().includes(value.toLowerCase())
      );

      if (found) {
        setActiveArrondissement(found.properties.l_ar);
      }
    } else {
      setActiveArrondissement(null);
    }
  };

  return (
    <div className="absolute flex top-4 right-4 z-[1000] bg-white ">
      <input
        type="text"
        placeholder="Rechercher un arrondissement..."
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 rounded-lg shadow-lg border-2 border-sky-700 focus:outline-none focus:border-sky-500 w-64"
      />
    </div>
  );
};

export default SearchBar;
