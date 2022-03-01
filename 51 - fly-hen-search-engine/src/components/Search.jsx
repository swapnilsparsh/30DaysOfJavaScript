import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import { useStateContext } from '../contexts/StateContextProvider';
import { Links } from './Links';

export const Search = () => {
  const { setSearchTerm } = useStateContext();
  const [text, setText] = useState('APJ Abdul Kalam');
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        value={text}
        type="text"
        className="sm:w-96 w-80 h-10 dark:bg-gray-200  border rounded shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="🔎 Search Google or type URL"
        onChange={(e) => setText(e.target.value)}
      />
      {text !== '' && (
        <button type="button" className="absolute top-1.5 right-4 text-2xl text-gray-500 " onClick={() => setText('')}>
          x
        </button>
      )}
      <Links />
    </div>
  );
};
