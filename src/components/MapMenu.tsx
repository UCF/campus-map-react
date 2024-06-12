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
            <div className='btn-group my-1'>
              <div className='btn-group'>
                <a className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' href='#locations' role="button" aria-expanded="false">Locations</a>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className={props.visibility.locations.buildings ? 'dropdown-item active' : 'dropdown-item'}
                      href='#buildings'
                      id="buildings"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'buildings': !props.visibility.locations.buildings
                        }})
                      }>
                      Buildings
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.housing ? 'dropdown-item active' : 'dropdown-item'}
                      href='#housing'
                      id="housing"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'housing': !props.visibility.locations.housing
                        }})
                      }>
                      Housing
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.dining ? 'dropdown-item active' : 'dropdown-item'}
                      href='#dining'
                      id="dining"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'dining': !props.visibility.locations.dining
                        }})
                      }>
                      Dining
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.retail ? 'dropdown-item active' : 'dropdown-item'}
                      href='#retail'
                      id="retail"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'retail': !props.visibility.locations.retail
                        }})
                      }>
                      Retail
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.labs ? 'dropdown-item active' : 'dropdown-item'}
                      href='#labs'
                      id="labs"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'labs': !props.visibility.locations.labs
                        }})
                      }>
                      Labs
                    </a>
                  </li>
                </ul>
              </div>
              <a
                className={props.visibility.parking ? 'btn btn-dark' : 'btn btn-outline-dark'}
                href='#parking'
                id="parking"
                onClick={() => props.setVisibility({ ...props.visibility, 'parking': !props.visibility.parking })}>
                  Parking
              </a>
              <div className='btn-group'>
                <a className='btn btn-outline-dark dropdown-toggle' data-bs-toggle='dropdown' href='#locations' role="button" aria-expanded="false">Outdoors</a>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className={props.visibility.outdoors.greenspaces ? 'dropdown-item active' : 'dropdown-item'}
                      href='#greenspaces'
                      id="greenspaces"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'greenspaces': !props.visibility.outdoors.greenspaces
                        }})
                      }>
                      Green Spaces
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.outdoors.recreation ? 'dropdown-item active' : 'dropdown-item'}
                      href='#recreation'
                      id="recreation"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'recreation': !props.visibility.outdoors.recreation
                        }})
                      }>
                      Recreation
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.outdoors.wellBeing ? 'dropdown-item active' : 'dropdown-item'}
                      href='#wellBeing'
                      id="wellBeing"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'wellBeing': !props.visibility.outdoors.wellBeing
                        }})
                      }>
                      Well-Being
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>   
        <div className='col-12 col-lg-6'>
        <div className='d-flex justify-content-center py-1'>
        <div className="btn-group btn-group-sm my-1" role="group" aria-label="Basic checkbox toggle button group">     
            <a className="btn btn-outline-dark dropdown-toggle rounded-0" id="accessibility" href="#accessibility" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img width={30} src='./img/handicap.png' alt="Accessibility" />
              <span>Accessibility</span>
            </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className={props.visibility.accessibility.parking ? 'dropdown-item active' : 'dropdown-item'}
                    id="accessible-parking"
                    href='#accessible-parking'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'parking': !props.visibility.accessibility.parking
                      }})
                    }
                  >
                    Parking
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.buildingRamps ? 'dropdown-item active' : 'dropdown-item'}
                    id="building-ramps"
                    href='#building-ramps'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'buildingRamps': !props.visibility.accessibility.buildingRamps
                      }})
                    }
                  >
                    Building Ramps
                  </a>
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.curbRamps ? 'dropdown-item active' : 'dropdown-item'}
                    href='#curbRamps'
                    id="curbRamps"
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'curbRamps': !props.visibility.accessibility.curbRamps
                      }})
                    }
                  >
                    Parking Ramps
                  </a>
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.autoDoors ? 'dropdown-item active' : 'dropdown-item'}
                    id="autoDoors"
                    href='#autoDoors'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'autoDoors': !props.visibility.accessibility.autoDoors
                      }})
                    }
                  >
                    Automatic Doors
                  </a>
                </li>
              </ul>

              <input
                className='btn-check'
                type="checkbox"
                name="shuttleStops"
                id="shuttleStops"
                checked={props.visibility.shuttleStops}
                onChange={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='shuttleStops'><img width={30} src='./img/bus.png' alt="bus logo"/><span> Shuttle</span></label>
              <input
                className='btn-check'
                type="checkbox"
                name="blueLightPhones"
                id="blueLightPhones"
                checked={props.visibility.emergencyPhones}
                onChange={() => props.setVisibility({ ...props.visibility, 'emergencyPhones': !props.visibility['emergencyPhones'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='blueLightPhones'><img width={30} src='./img/phone.png' alt="emergency phones"/><span> Emergency</span></label> 
              <button type="button" className="btn btn-outline-dark align-items-center dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <a
                      className={props.visibility.bikeRacks ? 'dropdown-item active' : 'dropdown-item'}
                      href='#bikeRack'
                      id="bikeRacks"
                      onClick={() => props.setVisibility({ ...props.visibility, 'bikeRacks': !props.visibility['bikeRacks'] })}
                    >
                      Bike Racks
                    </a>
                  </li>
                  <li>
                  <a
                    className={props.visibility.family ? 'dropdown-item active' : 'dropdown-item'}
                    id="family"
                    href='#family'
                    onClick={() => props.setVisibility({ ...props.visibility, 'family': !props.visibility['family'] })}
                  >
                    Family Resources
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.knightsPantry ? 'dropdown-item active' : 'dropdown-item'}
                    id="pantry"
                    href='#pantry'
                    onClick={() => props.setVisibility({ ...props.visibility, 'knightsPantry': !props.visibility['knightsPantry'] })}
                  >
                    Knight's Pantry
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.art ? 'dropdown-item active' : 'dropdown-item'}
                    id="art"
                    href='#art'
                    onClick={() => props.setVisibility({ ...props.visibility, 'art': !props.visibility['art'] })}
                  >Art
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.studentServices ? 'dropdown-item active' : 'dropdown-item'}
                    id="services"
                    href='#services'
                    onClick={() => props.setVisibility({ ...props.visibility, 'studentServices': !props.visibility['studentServices'] })}
                  >
                    Student Services
                  </a>  
                </li>
              </ul>
      
          </div>
        </div>
        </div>
      </div>
    </div>
      
  );
}
