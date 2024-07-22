import { Feature } from 'geojson';

import closeIcon from '../assets/xmark-solid.png';
import searchIcon from '../assets/search-white.png';

import './SearchResults.scss';
import { useState, useEffect } from 'react';

import ReactGA from "react-ga4"

interface SearchResultsProps {
  searchResults: Array<Feature>,
  onSearchResultClick: Function,
  searchData: Function
}

export default function SearchResults(props: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  useEffect(() => {
    const delaySearchQueryTimeOutId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(delaySearchQueryTimeOutId);
  }, [searchQuery, 500])

  useEffect(() => {
    ReactGA.event({
      category: "map_search",
      action: "search",
      label: `${debouncedSearchQuery}`,
    });
  },[debouncedSearchQuery])


  return (
    <div className='search-control-wrapper rounded'>
      <div className='input-group'>
      <input
        className='form-control'
        type='text'
        placeholder='Find locations, services, parking & more... '
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          props.searchData(e.target.value)
        }} />
        <div className="input-group-text border-0 bg-black" id="search-addon">
          {
          searchQuery !== '' ? (
            <img width={20} src={closeIcon} onClick={() => {
              props.searchData(null)
              setSearchQuery('');
            }} />
          ) : (
            <img width={20} src={searchIcon} />
          ) }
        </div>
      </div>  
      {props.searchResults && props.searchResults.length > 0 && (
        <div className='search-results-container'>
          <h2 className='sr-only'>Search Results</h2>
          <ul id='search-results' className='search-results'>
            {props.searchResults.map((result: Feature) => {
              return (
                <li key={result!.properties!.Name} className='list-item search-result'>
                  <a
                    className='search-result-link'
                    onClick={() => props.onSearchResultClick(result)}>
                    {result!.properties!.Name}  
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}


