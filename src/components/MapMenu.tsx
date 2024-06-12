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
            <div className='btn-group'>
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
                  <li className='dropdown-item'>
                    <a
                      className={props.visibility.outdoors.greenspaces ? 'nav-link active' : 'nav-link'}
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
                  <li className='dropdown-item'>
                    <a
                      className={props.visibility.outdoors.recreation ? 'nav-link active' : 'nav-link'}
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
                  <li className='dropdown-item'>
                    <a
                      className={props.visibility.outdoors.wellBeing ? 'nav-link active' : 'nav-link'}
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
            <button className="btn btn-outline-dark dropdown-toggle rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img width={30} src='./img/handicap.png' alt="Accessibility" />
              <span> Accessibility</span>
            </button>
              <ul className="dropdown-menu">
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="accessible-parking"
                    id="accessible-parking"
                    checked={props.visibility.accessibility.parking}
                    onChange={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'parking': !props.visibility.accessibility.parking
                      }})
                    }
                  />
                  <label htmlFor="accessible-parking">
                    Parking
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="building-ramps"
                    id="building-ramps"
                    checked={props.visibility.accessibility.buildingRamps}
                    onChange={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'buildingRamps': !props.visibility.accessibility.buildingRamps
                      }})
                    }
                  />
                  <label htmlFor="building-ramps">
                    Building Ramps
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="parking-ramps"
                    id="parking-ramps"
                    checked={props.visibility.accessibility.curbRamps}
                    onChange={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'curbRamps': !props.visibility.accessibility.curbRamps
                      }})
                    }
                  />
                  <label htmlFor="parking-ramps">
                    Parking Ramps
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="automatic-doors"
                    id="automatic-doors"
                    checked={props.visibility.accessibility.autoDoors}
                    onChange={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'autoDoors': !props.visibility.accessibility.autoDoors
                      }})
                    }
                  />
                  <label htmlFor="automatic-doors">
                    Automatic Doors
                  </label>
                </div>
              </ul>

              <input
                className='btn-check'
                type="checkbox"
                name="shuttleStops"
                id="shuttleStops"
                checked={props.visibility.shuttleStops}
                onChange={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='shuttleStops'><img width={30} src='./img/bus.png' /><span> Shuttle</span></label>
              <input
                className='btn-check'
                type="checkbox"
                name="blueLightPhones"
                id="blueLightPhones"
                checked={props.visibility.emergencyPhones}
                onChange={() => props.setVisibility({ ...props.visibility, 'emergencyPhones': !props.visibility['emergencyPhones'] })} />
              <label className="btn btn-outline-dark d-flex align-items-center" htmlFor='blueLightPhones'><img width={30} src='./img/phone.png'/><span> Emergency</span></label> 
              <button type="button" className="btn btn-outline-dark align-items-center dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <div className="dropdown-item">
                    <input
                      className="btn-check"
                      type="checkbox"
                      name="bike-racks"
                      id="bike-racks"
                      checked={props.visibility.bikeRacks}
                      onChange={() => props.setVisibility({ ...props.visibility, 'bikeRacks': !props.visibility['bikeRacks'] })}
                    />
                    <label htmlFor="bike-racks">
                      Bike Racks
                    </label>
                  </div>
                  <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="family"
                    id="family"
                    checked={props.visibility.family}
                    onChange={() => props.setVisibility({ ...props.visibility, 'family': !props.visibility['family'] })}
                  />
                  <label htmlFor="family">
                    Family Resources
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="pantry"
                    id="pantry"
                    checked={props.visibility.knightsPantry}
                    onChange={() => props.setVisibility({ ...props.visibility, 'knightsPantry': !props.visibility['knightsPantry'] })}
                  />
                  <label htmlFor="pantry">
                    Knight's Pantry
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="art"
                    id="art"
                    checked={props.visibility.art}
                    onChange={() => props.setVisibility({ ...props.visibility, 'art': !props.visibility['art'] })}
                  />
                  <label htmlFor="art">
                    Art
                  </label>
                </div>
                <div className="dropdown-item">
                  <input
                    className="btn-check"
                    type="checkbox"
                    name="services"
                    id="services"
                    checked={props.visibility.studentServices}
                    onChange={() => props.setVisibility({ ...props.visibility, 'studentServices': !props.visibility['studentServices'] })}
                  />
                  <label htmlFor="services">
                    Student Services
                  </label>
                </div>
              </ul>
      
          </div>
        </div>
        </div>
      </div>
    </div>
      
  );
}
