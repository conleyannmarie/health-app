import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Auth from '../utils/auth';

const SelectDate = (props) => {
   const [selectDateState, setSelectDateState] = useState({
      date: new Date(),
      provider: props.provider,
      specialty: props.specialty,
   });

   const handleCalendarClose = () => console.log('Calendar closed');
   const handleCalendarOpen = () => console.log('Calendar opened');

   return (
      <div className='card-body'>
         <div className='col-12 mb-3'>
            <div>
               <p>
                  Provider<span>{selectDateState.provider}</span>
               </p>
            </div>
            <div>
               <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  onCalendarClose={handleCalendarClose}
                  onCalendarOpen={handleCalendarOpen}
               />
            </div>
         </div>
      </div>
   );
};

export default SelectDate;
