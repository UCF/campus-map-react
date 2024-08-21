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
  const [searchBoxVisibility,setSearchBoxVisibility] = useState<boolean>(false);

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
      <div className='input-group' role='search'>
      <input
        className='form-control'
        type='text'
        placeholder='Find locations, services, parking & more... '
        aria-label='Search for locations,services, parking, and more'
        value={searchQuery}
        onChange={(e) => {
          !searchBoxVisibility && e.target.value ?  setSearchBoxVisibility(true) : ''
          setSearchQuery(e.target.value);
          props.searchData(e.target.value);
        }}
        tabIndex={0}
        role='searchbox'
        />
        <div className="input-group-text border-0 bg-black" id="search-addon">
          {
          searchQuery !== '' ? (
            <img width={20} src={closeIcon} onClick={() => {
              searchBoxVisibility ? setSearchBoxVisibility (false) : ''
              props.searchData(null)
              setSearchQuery('');
            }}
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                searchBoxVisibility ? setSearchBoxVisibility (false) : ''
                props.searchData(null)
                setSearchQuery('');
              }
            }}
            tabIndex={0}
            role='button'
            />
          ) : (
            <img width={20} src={searchIcon} alt="search icon"
            />
          ) }
        </div>
      </div>  
      {props.searchResults && props.searchResults.length > 0 && searchBoxVisibility && (
        <div className='search-results-container'>
          <h2 className='sr-only'>Search Results</h2>
          <ul role="listbox" tabIndex={-1} id='search-results' className='search-results'>
            {props.searchResults.map((result: Feature) => {
              return (
                <li key={result!.properties!.Name} className='list-item search-result'>
                  <a
                    className='search-result-link'
                    onClick={() => {
                      setSearchBoxVisibility(false);
                      props.onSearchResultClick(result);
                      }
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setSearchBoxVisibility(false);
                        props.onSearchResultClick(result);
                      }
                    }}
                    role="option"
                    tabIndex={0}
                    >
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


