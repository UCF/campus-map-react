import { Feature } from '../types/MapData';
import { SearchResults } from '../types/SearchResults';
import './MapMenu.scss';

interface MapMenuProps {
  visibility: {
    locations: boolean,
    departments: boolean,
    emPhones: boolean,
    dining: boolean,
    bikes: boolean,
    family: boolean,
    housing: boolean,
    pantry: boolean,
    labs: boolean,
    art: boolean,
    rec: boolean,
    retail: boolean,
    services: boolean,
    parking: boolean,
    well_being: boolean
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
      {showResults(props.searchResults?.locationResults) && (
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
      {showResults(props.searchResults?.departmentResults) && (
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
      {showResults(props.searchResults?.diningResults) && (
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
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="family"
          checked={props.visibility.family}
          onChange={() => props.setVisibility({ ...props.visibility, family: !props.visibility.family })} />
        <label className="form-check-label" htmlFor='family'>Family Resources</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="housing"
          checked={props.visibility.housing}
          onChange={() => props.setVisibility({ ...props.visibility, housing: !props.visibility.housing })} />
        <label className="form-check-label" htmlFor='housing'>Housing</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="pantry"
          checked={props.visibility.pantry}
          onChange={() => props.setVisibility({ ...props.visibility, pantry: !props.visibility.pantry })} />
        <label className="form-check-label" htmlFor='pantry'>Knight's Pantry</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="labs"
          checked={props.visibility.labs}
          onChange={() => props.setVisibility({ ...props.visibility, labs: !props.visibility.labs })} />
        <label className="form-check-label" htmlFor='labs'>Labs</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="art"
          checked={props.visibility.art}
          onChange={() => props.setVisibility({ ...props.visibility, art: !props.visibility.art })} />
        <label className="form-check-label" htmlFor='art'>Art</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="rec"
          checked={props.visibility.rec}
          onChange={() => props.setVisibility({ ...props.visibility, rec: !props.visibility.rec })} />
        <label className="form-check-label" htmlFor='bikes'>Recreation</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="retail"
          checked={props.visibility.retail}
          onChange={() => props.setVisibility({ ...props.visibility, retail: !props.visibility.retail })} />
        <label className="form-check-label" htmlFor='retail'>Retail</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="services"
          checked={props.visibility.services}
          onChange={() => props.setVisibility({ ...props.visibility, services: !props.visibility.services })} />
        <label className="form-check-label" htmlFor='services'>Services</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="bikes"
          checked={props.visibility.parking}
          onChange={() => props.setVisibility({ ...props.visibility, parking: !props.visibility.parking })} />
        <label className="form-check-label" htmlFor='parking'>Parking</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="well-being"
          checked={props.visibility.well_being}
          onChange={() => props.setVisibility({ ...props.visibility, well_being: !props.visibility.well_being })} />
        <label className="form-check-label" htmlFor='well-being'>Well Being</label>
      </div>
    </div>
  );
}
