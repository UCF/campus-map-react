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
    wellBeing: boolean
  },
  setVisibility: Function
}

export default function MapMenu(props: MapMenuProps) {
  return (
    <div className='h-100'>
      <h2 className='my-3 d-none'>Layers</h2>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="locations"
          checked={props.visibility.locations}
          onChange={() => props.setVisibility({ ...props.visibility, 'locations': !props.visibility['locations'] })} />
        <label className="form-check-label" htmlFor='locations'>Locations</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="departments"
          checked={props.visibility.departments}
          onChange={() => props.setVisibility({ ...props.visibility, departments: !props.visibility.departments })} />
        <label className="form-check-label" htmlFor='departments'>Departments</label>
      </div>
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
          checked={props.visibility.wellBeing}
          onChange={() => props.setVisibility({ ...props.visibility, wellBeing: !props.visibility.wellBeing })} />
        <label className="form-check-label" htmlFor='well-being'>Well Being</label>
      </div>
    </div>
  );
}
