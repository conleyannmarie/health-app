import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../../utils/auth';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const SelectDate = (props) => {
   const [selectDateState, setSelectDateState] = useState({
      date: new Date(),
      provider: props.match.params.provider,
      specialty: props.match.params.specialty,
   });

   const handleCalendarChange = (event) => {
      setSelectDateState({
         ...selectDateState,
         date: event,
      });
   };

   const handleCalendarClose = () => console.log('Calendar closed');
   const handleCalendarOpen = () => console.log('Calendar opened');

   return (
      <div className='card login-signup-card shadow-sm'>
         <div className='card-body'>
            <h1>Select Date</h1>
            <p className='text-selectdate'>
               Provider: <span>{selectDateState.provider}</span>
            </p>
            <p className='text-selectdate'>
               Specialty: <span>{selectDateState.specialty}</span>
            </p>
         </div>
         <span>Check availablity</span>
         <div className='create-appt' style={{ display: 'flex', alignItems: 'center' }}>
            <DatePicker
               selected={selectDateState.date}
               onChange={(selectedDate) => handleCalendarChange(selectedDate)}
               onCalendarClose={handleCalendarClose}
               onCalendarOpen={handleCalendarOpen}
            />
            <Link
               to={`/timeavailable/${selectDateState.provider}/${selectDateState.specialty}/${selectDateState.date}`}
            >
               <button className='btn btn-add'>submit</button>
            </Link>
         </div>
      </div>
   );
};

// to={`/timeavailable/${selectDateState.provider}/${selectDateState.specialty}/${selectDateState.date}`}

export default SelectDate;
