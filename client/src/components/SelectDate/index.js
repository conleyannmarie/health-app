import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Auth from '../../utils/auth';

const SelectDate = (props) => {
   const [selectDateState, setSelectDateState] = useState({
      date: new Date(),
      // provider: props.provider,
      // specialty: props.specialty,
      provider: 'mantis toboggan',
      specialty: 'IM A DOCTOR',
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
      <div>
         <div>
            <div>
               <p>
                  Provider: <span>{selectDateState.provider}</span>
               </p>
               <p>
                  Specialty: <span>{selectDateState.specialty}</span>
               </p>
            </div>
            <div>
               <DatePicker
                  selected={selectDateState.date}
                  onChange={(selectedDate) => handleCalendarChange(selectedDate)}
                  onCalendarClose={handleCalendarClose}
                  onCalendarOpen={handleCalendarOpen}
               />
            </div>
         </div>
      </div>
   );
};

export default SelectDate;
