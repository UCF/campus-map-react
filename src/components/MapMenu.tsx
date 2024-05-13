import './MapMenu.scss';

interface MapMenuProps {
  visibility: {
    locations: boolean,
    departments: boolean,
    emPhones: boolean,
    dining: boolean
  },
  setVisibility: Function
}

export default function MapMenu(props: MapMenuProps) {
  return (
    <div className='h-100'>
      <h2 className='my-3'>Layers</h2>
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
    </div>
  );
}
