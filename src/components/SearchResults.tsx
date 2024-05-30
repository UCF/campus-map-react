import { Feature } from 'geojson';

import './SearchResults.scss';

interface SearchResultsProps {
  searchResults: Array<Feature>,
  onSearchResultClick: Function,
  searchData: Function
}

export default function SearchResults(props: SearchResultsProps) {
  console.log(props.searchResults);

  return (
    <>
      <input
        className='search-control'
        type='text'
        placeholder='Search...'
        onChange={(e) => props.searchData(e.target.value)} />
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
    </>
  );
}


