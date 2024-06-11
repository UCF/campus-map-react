import { Visibility } from '../types/Visibility';
import './MapMenu.scss';

interface MapMenuProps {
  visibility: Visibility,
  setVisibility: Function
}

export default function MapMenu(props: MapMenuProps) {
  return (
    <div className='w-100'>
      <div className='row'>
        <div className='col-12 col-lg-6'>
            <div className="d-flex flex-row flex-wrap justify-content-center justify-content-sm-start py-1">
              <div className="ms-1 ms-sm-3 my-1">
              <input
                className='btn-check'
                type="checkbox"
                name="buildings"
                id="buildings"
                checked={props.visibility.locations.buildings}
                onChange={() => props.setVisibility({ ...props.visibility, 'buildings': !props.visibility.locations.buildings })} />
              <label className="btn btn-outline-dark" htmlFor='buildings'>Locations</label>
              </div>
              <div className="ms-1 ms-sm-3 my-1">
            <input
              className='btn-check'
              type="checkbox"
              name="roads"
              id="roads"
              checked={props.visibility.roads}
              onChange={() => props.setVisibility({ ...props.visibility, 'roads': !props.visibility['roads'] })} />
            <label className="btn btn-outline-dark" htmlFor='roads'>Roads and Parking Lots</label>
          </div>
          <div className="ms-1 ms-sm-3 my-1">
            <input
              className='btn-check'
              type="checkbox"
              name="greenSpaces"
              id='greenSpaces'
              checked={props.visibility.greenSpaces}
              onChange={() => props.setVisibility({ ...props.visibility, 'greenSpaces': !props.visibility['greenSpaces'] })} />
            <label className="btn btn-outline-dark" htmlFor='greenSpaces'>Green Spaces</label>
          </div> 
          <div className="ms-1 ms-sm-3 my-1">
            <input
              className='btn-check'
              type="checkbox"
              name="walkways"
              id="walkways"
              checked={props.visibility.walkways}
              onChange={() => props.setVisibility({ ...props.visibility, 'walkways': !props.visibility['walkways'] })} />
            <label className="btn btn-outline-dark" htmlFor='walkways'>Walkways</label>
          </div>
          
          </div>
        </div>   
        <div className='col-12 col-lg-6'>
        <div className='d-flex justify-content-center py-1'>
        <div className="btn-group btn-group-sm my-1" role="group" aria-label="Basic checkbox toggle button group">
              <input
                className='btn-check'
                type="checkbox"
                name="accessibility"
                id="accessibility"
                checked={props.visibility.accessibility}
                onChange={() => props.setVisibility({ ...props.visibility, 'accessibility': !props.visibility['accessibility'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='accessibility'><img width={30} src='./img/handicap.png' /><span> Accessiblity</span></label>
              <input
                className='btn-check'
                type="checkbox"
                name="shuttleStops"
                id="shuttleStops"
                checked={props.visibility.shuttleStops}
                onChange={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='shuttleStops'><img width={30} src='./img/bus.png' /><span> Shuttle</span></label>
              <div className="btn-group" role="group">
    <button type="button" className="btn btn-outlined d-flex align-items-center dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li><a className="dropdown-item" href="#">Dropdown link</a></li>
      <li><a className="dropdown-item" href="#">Dropdown link</a></li>
    </ul>
  </div>         
          </div>
        </div>
        </div>
      </div>
    </div>
      
  );
}
