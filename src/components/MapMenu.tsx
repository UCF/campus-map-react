import './MapMenu.scss';

interface MapMenuProps {
  visibility: {
    buildings: boolean,
    accessibility: boolean,
    greenSpaces: boolean,
    blueLightPhones: boolean,
    roads: boolean,
    walkways: boolean,
    shuttleStops: boolean
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
          name="buildings"
          checked={props.visibility.buildings}
          onChange={() => props.setVisibility({ ...props.visibility, 'buildings': !props.visibility['buildings'] })} />
        <label className="form-check-label" htmlFor='buildings'>Buildings</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="accessibility"
          checked={props.visibility.accessibility}
          onChange={() => props.setVisibility({ ...props.visibility, 'accessibility': !props.visibility['accessibility'] })} />
        <label className="form-check-label" htmlFor='accessibility'>Accessibility</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="greenSpaces"
          checked={props.visibility.greenSpaces}
          onChange={() => props.setVisibility({ ...props.visibility, 'greenSpaces': !props.visibility['greenSpaces'] })} />
        <label className="form-check-label" htmlFor='greenSpaces'>Green Spaces</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="blueLightPhones"
          checked={props.visibility.blueLightPhones}
          onChange={() => props.setVisibility({ ...props.visibility, 'blueLightPhones': !props.visibility['blueLightPhones'] })} />
        <label className="form-check-label" htmlFor='blueLightPhones'>Emergency Phones</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="roads"
          checked={props.visibility.roads}
          onChange={() => props.setVisibility({ ...props.visibility, 'roads': !props.visibility['roads'] })} />
        <label className="form-check-label" htmlFor='roads'>Roads and Parking Lots</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="walkways"
          checked={props.visibility.walkways}
          onChange={() => props.setVisibility({ ...props.visibility, 'walkways': !props.visibility['walkways'] })} />
        <label className="form-check-label" htmlFor='walkways'>Walkways</label>
      </div>
      <div className="form-check">
        <input
          className='form-check-input'
          type="checkbox"
          name="shuttleStops"
          checked={props.visibility.shuttleStops}
          onChange={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} />
        <label className="form-check-label" htmlFor='shuttleStops'>Shuttle Stops</label>
      </div>
    </div>
  );
}
