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
      <div className="d-flex flex-row flex-wrap justify-content-center">
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="buildings"
          id="buildings"
          checked={props.visibility.buildings}
          onChange={() => props.setVisibility({ ...props.visibility, 'buildings': !props.visibility['buildings'] })} />
        <label className="btn btn-outline-dark" htmlFor='buildings'>Buildings</label>
      </div>
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="accessibility"
          id="accessibility"
          checked={props.visibility.accessibility}
          onChange={() => props.setVisibility({ ...props.visibility, 'accessibility': !props.visibility['accessibility'] })} />
        <label className="btn btn-outline-dark" htmlFor='accessibility'>Accessibility</label>
      </div>
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="greenSpaces"
          id='greenSpaces'
          checked={props.visibility.greenSpaces}
          onChange={() => props.setVisibility({ ...props.visibility, 'greenSpaces': !props.visibility['greenSpaces'] })} />
        <label className="btn btn-outline-dark" htmlFor='greenSpaces'>Green Spaces</label>
      </div>
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="blueLightPhones"
          id="blueLightPhones"
          checked={props.visibility.blueLightPhones}
          onChange={() => props.setVisibility({ ...props.visibility, 'blueLightPhones': !props.visibility['blueLightPhones'] })} />
        <label className="btn btn-outline-dark" htmlFor='blueLightPhones'>Emergency Phones</label>
      </div>
      
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="walkways"
          id="walkways"
          checked={props.visibility.walkways}
          onChange={() => props.setVisibility({ ...props.visibility, 'walkways': !props.visibility['walkways'] })} />
        <label className="btn btn-outline-dark" htmlFor='walkways'>Walkways</label>
      </div>
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="shuttleStops"
          id="shuttleStops"
          checked={props.visibility.shuttleStops}
          onChange={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} />
        <label className="btn btn-outline-dark" htmlFor='shuttleStops'>Shuttle Stops</label>
      </div>
      <div className="form-check">
        <input
          className='btn-check'
          type="checkbox"
          name="roads"
          id="roads"
          checked={props.visibility.roads}
          onChange={() => props.setVisibility({ ...props.visibility, 'roads': !props.visibility['roads'] })} />
        <label className="btn btn-outline-dark" htmlFor='roads'>Roads and Parking Lots</label>
      </div>
      </div>
    </div>
  );
}
