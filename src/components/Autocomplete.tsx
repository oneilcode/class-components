import { useState, useEffect, useRef } from 'react';
import { useCountryStore } from '../store/use-country-store';

interface AutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Autocomplete({
  value = '',
  onChange,
}: AutocompleteProps) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const countries = useCountryStore((state) => state.countries);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const query = e.target.value;
    onChange?.(query);

    if (query.length > 0) {
      const filtered = countries.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelect = (country: string) => {
    onChange?.(country);
    setShowSuggestions(false);
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}
      className="form-input"
    >
      <label htmlFor="country">Country</label>
      <input
        value={value}
        type="text"
        name="country"
        id="country"
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Your country..."
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="country-list">
          {suggestions.map((suggestion, index) => (
            <li
              className="country-item"
              key={index}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
