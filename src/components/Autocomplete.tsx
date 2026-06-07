import { useState, useEffect, useRef } from 'react';
import { useCountryStore } from '../store/use-country-store';

export default function Autocomplete() {
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleSelect = (suggestion) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
    }
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
