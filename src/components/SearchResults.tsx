import { GeoJsonProperties } from 'geojson';
import { useMap } from 'react-map-gl';

interface SearchResultsProps {
  searchResults: Array<GeoJsonProperties>,
  onSearchResultClick: Function,
  searchData: Function
}

export default function SearchResults(props: SearchResultsProps) {
  return (
    <>
      <input
        className='form-control'
        type='text'
        placeholder='Search...'
        onChange={(e) => props.searchData(e.target.value)} />
      {props.searchResults && props.searchResults.length > 0 && (
        <>
          <h2>Search Results</h2>
          <ul id='search-results'>
            {props.searchResults.map((result: GeoJsonProperties) => {
              return (
                <li key={result!.properties.name} className='list-item search-result'>
                  <a
                    className='search-result-link'
                    onClick={() => props.onSearchResultClick(result)}>
                    {result!.properties.name}  
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}


