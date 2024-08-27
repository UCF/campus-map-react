import { Visibility } from '../types/Visibility';
import './MapMenu.scss';

import checked from '../assets/square-check-solid.png';
import unchecked from '../assets/square-thin.png';

import busIcon from '../assets/bus.svg';
import phoneIcon from '../assets/phone.svg';
import accessibilityIcon from '../assets/handicap.svg';

interface MapMenuProps {
  visibility: Visibility,
  setVisibility: Function
}

export default function MapMenu(props: MapMenuProps) {
  return (
    <div className='w-100'>
      <div className='d-flex row'>
        <div className='col-4 col-sm-2 col-xl-1 pt-2 mt-1 text-center'><span className='text-uppercase fw-bold navbar-brand'>Campus Map</span></div>
        <div className='order-3 order-sm-2 col-12 col-sm-6'>
          <div className="d-flex flex-row flex-wrap justify-content-center justify-content-md-start py-1 ms-sm-5">
            <div className='btn-group my-1'>
              <div className='btn-group'>
                <a className='btn btn-outline-dark dropdown-toggle ga-map-menu-item' data-bs-toggle='dropdown' href='#locations' role="button" aria-expanded="false">Locations</a>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className={props.visibility.locations.buildings ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#buildings'
                      id="buildings"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'buildings': !props.visibility.locations.buildings
                        }})
                      }>
                      <img width={15} alt="" src={ props.visibility.locations.buildings ? checked : unchecked } /> &nbsp;Buildings
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.housing ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#housing'
                      id="housing"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'housing': !props.visibility.locations.housing
                        }})
                      }><img width={15} alt="" src={ props.visibility.locations.housing ? checked : unchecked } />
                      &nbsp;
                      Housing
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.dining ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#dining'
                      id="dining"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'dining': !props.visibility.locations.dining
                        }})
                      }><img width={15} alt="" src={ props.visibility.locations.dining ? checked : unchecked } />
                      &nbsp;
                      Dining
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.retail ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#retail'
                      id="retail"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'retail': !props.visibility.locations.retail
                        }})
                      }><img width={15} alt="" src={ props.visibility.locations.retail ? checked : unchecked } />
                      &nbsp;
                      Retail
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.locations.labs ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#labs'
                      id="labs"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'locations': {
                          ...props.visibility.locations,
                          'labs': !props.visibility.locations.labs
                        }})
                      }><img width={15} alt="" src={ props.visibility.locations.labs ? checked : unchecked } />&nbsp;
                      Labs
                    </a>
                  </li>
                </ul>
              </div>
              <a  
                className={props.visibility.parking ? 'btn btn-dark ga-map-menu-item' : 'btn btn-outline-dark ga-map-menu-item'}
                href='#parking'
                id="parking"
                onClick={() => props.setVisibility({ ...props.visibility, 'parking': !props.visibility.parking })}>
                  Parking
              </a>
              <div className='btn-group'>
                <a className='btn btn-outline-dark dropdown-toggle ga-map-menu-item' data-bs-toggle='dropdown' href='#locations' role="button" aria-expanded="false">Outdoors</a>
                <ul className='dropdown-menu'>
                  <li>
                    <a
                      className={props.visibility.outdoors.greenspaces ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#greenspaces'
                      id="greenspaces"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'greenspaces': !props.visibility.outdoors.greenspaces
                        }})
                      }><img width={15} alt="" src={ props.visibility.outdoors.greenspaces ? checked : unchecked } />
                      &nbsp;
                      Green Spaces
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.outdoors.recreation ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#recreation'
                      id="recreation"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'recreation': !props.visibility.outdoors.recreation
                        }})
                      }><img width={15} alt="" src={ props.visibility.outdoors.recreation ? checked : unchecked } />
                      &nbsp;
                      Recreation
                    </a>
                  </li>
                  <li>
                    <a
                      className={props.visibility.outdoors.wellBeing ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#wellBeing'
                      id="wellBeing"
                      onClick={() =>
                        props.setVisibility({...props.visibility, 'outdoors': {
                          ...props.visibility.outdoors,
                          'wellBeing': !props.visibility.outdoors.wellBeing
                        }})
                      }><img width={15} alt="" src={ props.visibility.outdoors.wellBeing ? checked : unchecked } />
                      &nbsp;
                      Well-Being
                    </a>
                  </li>
                </ul>
              </div>
              <div className='btn-group'>
                <a className='btn btn-outline-dark dropdown-toggle ga-map-menu-item' data-bs-toggle='dropdown' href='#locations' role="button" aria-expanded="false">More</a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                    <a
                      className={props.visibility.bikeRacks ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                      href='#bikeRack'
                      id="bikeRacks"
                      onClick={() => props.setVisibility({ ...props.visibility, 'bikeRacks': !props.visibility['bikeRacks'] })}
                    > <img width={15} alt="" src={ props.visibility.bikeRacks ? checked : unchecked } />
                    &nbsp;
                      Bike Racks
                    </a>
                  </li>
                  <li>
                  <a
                    className={props.visibility.family ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="family"
                    href='#family'
                    onClick={() => props.setVisibility({ ...props.visibility, 'family': !props.visibility['family'] })}
                  ><img width={15} alt="" src={ props.visibility.family ? checked : unchecked } />
                  &nbsp;
                    Family Resources
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.knightsPantry ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="pantry"
                    href='#pantry'
                    onClick={() => props.setVisibility({ ...props.visibility, 'knightsPantry': !props.visibility['knightsPantry'] })}
                  > <img width={15} alt="" src={ props.visibility.knightsPantry ? checked : unchecked } />
                  &nbsp;
                    Knight's Pantry
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.art ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="art"
                    href='#art'
                    onClick={() => props.setVisibility({ ...props.visibility, 'art': !props.visibility['art'] })}
                  ><img width={15} alt="" src={ props.visibility.art ? checked : unchecked } />
                  &nbsp; Art
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.studentServices ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="services"
                    href='#services'
                    onClick={() => props.setVisibility({ ...props.visibility, 'studentServices': !props.visibility['studentServices'] })}
                  > <img width={15} alt="" src={ props.visibility.studentServices ? checked : unchecked } />
                  &nbsp;
                    Student Services
                  </a>  
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>   
        <div className='order-1 order-sm-3 col-8 col-sm-4 px-0'>
        <div className='d-flex justify-content-end me-3'>
        <div className="btn-group btn-outline-warning btn-group-sm my-1" role="group" aria-label="Basic checkbox toggle button group">     
            <a className="btn dropdown-toggle rounded-end-0 rounded-start-0 d-flex align-items-center" id="accessibility" href="#accessibility" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img width={42} src={accessibilityIcon} alt="Accessibility Dropdown menu" />
            </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className={props.visibility.accessibility.parking ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="accessible-parking"
                    href='#accessible-parking'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'parking': !props.visibility.accessibility.parking
                      }})
                    }
                  > <img width={15} alt='' src={ props.visibility.accessibility.parking ? checked : unchecked } />
                  &nbsp;
                    Parking
                  </a>  
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.buildingRamps ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="building-ramps"
                    href='#building-ramps'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'buildingRamps': !props.visibility.accessibility.buildingRamps
                      }})
                    }
                  ><img width={15} alt="" src={ props.visibility.accessibility.buildingRamps ? checked : unchecked } />
                  &nbsp;
                    Building Ramps
                  </a>
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.curbRamps ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    href='#curbRamps'
                    id="curbRamps"
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'curbRamps': !props.visibility.accessibility.curbRamps
                      }})
                    }
                  > <img width={15} alt="" src={ props.visibility.accessibility.curbRamps ? checked : unchecked } />
                  &nbsp;
                    Parking Ramps
                  </a>
                </li>
                <li>
                  <a
                    className={props.visibility.accessibility.autoDoors ? 'dropdown-item active ga-map-menu-item' : 'dropdown-item ga-map-menu-item'}
                    id="autoDoors"
                    href='#autoDoors'
                    onClick={() => 
                      props.setVisibility({...props.visibility, 'accessibility': {
                        ...props.visibility.accessibility,
                        'autoDoors': !props.visibility.accessibility.autoDoors
                      }})
                    }
                  ><img width={15} alt="" src={ props.visibility.accessibility.autoDoors ? checked : unchecked } />
                  &nbsp;
                    Automatic Doors
                  </a>
                </li>
              </ul>
              <a
                className={props.visibility.shuttleStops ? 'btn btn-warning rounded-0 d-flex align-items-center' : 'btn rounded-0 d-flex align-items-center'}
                id="shuttleStops"
                href='#shuttleStops'
                onClick={() => props.setVisibility({ ...props.visibility, 'shuttleStops': !props.visibility['shuttleStops'] })} >
              <img width={30} src={busIcon} alt="bus stop"/></a>
              <a
                className={props.visibility.emergencyPhones ? 'btn btn-warning rounded-0 d-flex align-items-center' : 'btn rounded-0 d-flex align-items-center'}
                id="blueLightPhones"
                href='#blueLightPhones'
                onClick={() => props.setVisibility({ ...props.visibility, 'emergencyPhones': !props.visibility['emergencyPhones'] })} >
              <img width={30} src={phoneIcon} alt="emergency phones"/></a> 
          </div>
        </div>
        </div>
      </div>
    </div>
      
  );
}
