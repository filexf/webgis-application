import React, { useState, useEffect } from 'react';

const SearchBar = ({ data, setActiveArrondissement }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const filteredSuggestions = data.filter(
        item =>
          item.properties.l_ar.toLowerCase().includes(searchLower) ||
          item.properties.l_aroff.toLowerCase().includes(searchLower)
      ).slice(0, 5); // Limiter à 5 suggestions
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value) {
      setActiveArrondissement(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.properties.l_ar);
    setActiveArrondissement(suggestion.properties.l_ar);
    setShowSuggestions(false);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un arrondissement..."
          value={searchTerm}
          onChange={handleSearch}
          onFocus={() => setShowSuggestions(true)}
          className="px-4 py-2 rounded-lg shadow-lg border-2 border-sky-700 focus:outline-none focus:border-sky-500 w-64 bg-white"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.properties.c_ar}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 hover:bg-sky-100 cursor-pointer border-b last:border-b-0"
              >
                <div className="font-semibold">{suggestion.properties.l_ar}</div>
                <div className="text-sm text-gray-600">{suggestion.properties.l_aroff}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
