import { Feature } from '../types/MapData';
import { SearchResults } from '../types/SearchResults';
import './MapMenu.scss';

interface MapMenuProps {
  visibility: {
    locations: boolean,
    departments: boolean,
    emPhones: boolean,
    dining: boolean
  },
  setVisibility: Function,
  searchResults: SearchResults,
  searchData: Function
}

export default function MapMenu(props: MapMenuProps) {
  const showResults = (results: any): boolean => {
    return results && results.length > 0;
  }

  return (
    <div className='h-100'>
      <h2 className='my-3 d-none'>Layers</h2>
      <input
        className='form-control'
        type='text'
        onChange={(e) => props.searchData(e.target.value)} />
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="locations"
          checked={props.visibility.locations}
          onChange={() => props.setVisibility({ ...props.visibility, 'locations': !props.visibility['locations'] })} />
        <label className="form-check-label" htmlFor='locations'>Locations</label>
      </div>
      {showResults(props.searchResults.locationResults) && (
        <ul className='list-unstyled'>
          {props.searchResults.locationResults!.map((result) => {
            return (
              <li key={result.properties.name} className='list-item search-result ps-4'>
                <a className='' href='#'>
                  {result.properties.name}
                </a>
              </li>
            )
          })}
        </ul>
      )}
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="departments"
          checked={props.visibility.departments}
          onChange={() => props.setVisibility({ ...props.visibility, departments: !props.visibility.departments })} />
        <label className="form-check-label" htmlFor='departments'>Departments</label>
      </div>
      {showResults(props.searchResults.departmentResults) && (
        <ul className='list-unstyled'>
          {props.searchResults.departmentResults!.map((result) => {
            return (
              <li key={result.properties.name} className='list-item search-result ps-4'>
                <a className='' href='#'>
                  {result.properties.name}
                </a>
              </li>
            )
          })}
        </ul>
      )}
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="emergency-phones"
          checked={props.visibility.emPhones}
          onChange={() => props.setVisibility({ ...props.visibility, emPhones: !props.visibility.emPhones })} />
        <label className="form-check-label" htmlFor='emergency-phones'>Emergency Phones</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="dining"
          checked={props.visibility.dining}
          onChange={() => props.setVisibility({ ...props.visibility, dining: !props.visibility.dining })} />
        <label className="form-check-label" htmlFor='dining'>Dining</label>
      </div>
      {showResults(props.searchResults.diningResults) && (
        <ul className='list-unstyled'>
          {props.searchResults.diningResults!.map((result) => {
            return (
              <li key={result.properties.name} className='list-item search-result ps-4'>
                <a className='' href='#'>
                  {result.properties.name}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
}
