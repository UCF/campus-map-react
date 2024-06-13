import React from 'react';
import { Campus } from '../types/Campus';
import './Campuses.scss';

interface CampusesProps {
  campus: Campus[];
  onclick: (campus: Campus) => void;
}

const Campuses = ({ campus, onclick }: CampusesProps) => {
  return (
    <div className="campus-bar d-flex flex-wrap justify-content-around pt-3 mb-2">
      <div className='d-flex w-100 flex-wrap justify-content-around mb-2'>
        {campus.map((campusData, index) => (
          <React.Fragment key={index}>
            <a href={`#${campusData.shortName.toLowerCase()}`} className='text-decoration-none' onClick={()=> onclick(campusData)}>{campusData.shortName}</a>{ index !== campus.length - 1 && <span>|</span> }
            </React.Fragment>
          ))}
      </div>
      <div className='address text-start small'>
                4000 Central Florida Blvd. Orlando, Florida, 32816 | 
                <a className='text-white' href='tel:4078232000'> 407.823.2000</a>
      </div>  
  </div>
  );
};

export default Campuses;
