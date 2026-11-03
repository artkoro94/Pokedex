import { useState } from 'react';
import { SEARCH_STORAGE_KEY } from '../../shared/constants/storage';
import { useLocalStorage } from '../../hooks/use-local-storage';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  buttonLabel?: string;
}

export const Search = ({
  onSearch,
  placeholder = 'pikachu',
  buttonLabel = 'Search',
}: SearchProps) => {
  const [savedSearchTerm, setSavedSearchTerm] = useLocalStorage<string>(
    SEARCH_STORAGE_KEY,
    ''
  );
  const [searchTerm, setSearchTerm] = useState(savedSearchTerm);
  // A value in localStorage is only a draft until this component submits it.
  const [lastSubmittedSearchTerm, setLastSubmittedSearchTerm] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === lastSubmittedSearchTerm) {
      return;
    }

    setSavedSearchTerm(trimmedSearchTerm);
    setSearchTerm(trimmedSearchTerm);
    setLastSubmittedSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <section className="search-section" aria-label="Pokémon search">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          name="pokemon-search"
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          className="search-input"
          aria-label={placeholder}
        />

        <button className="button" type="submit">
          {buttonLabel}
        </button>
      </form>
    </section>
  );
};
