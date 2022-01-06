import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GET_APPT_PROVIDER } from '../../utils/queries';
import { ADD_APPT } from '../../utils/mutations';

import dateFormat from '../../utils/dateOnlyFormat';
import Button from 'react-bootstrap/Button';

import Auth from '../../utils/auth';

const TimeAvailable = (props) => {
   const provider = props.match.params.provider;
   const specialty = props.match.params.specialty;
   const date = dateFormat(props.match.params.date);

   const [timeState, setTimeState] = useState({
      provider: provider,
      specialty: specialty,
      date: date,
      availableSlot: null,
   });

   const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

   const { loading, data } = useQuery(QUERY_GET_APPT_PROVIDER, {
      variables: { apptWith: provider, apptDate: date },
   });

   const [addAppt, { error }] = useMutation(ADD_APPT);

   let availableSlots = [];
   if (data) {
      const filteredSlots = timeSlots.map((availableSlot) => {
         if (
            data.getApptsProvider.find((elem) => {
               return elem.apptTime === availableSlot;
            })
         ) {
            return null;
         }
         return availableSlot;
      });

      //* availableSlots to display
      availableSlots = filteredSlots.filter((elem) => {
         return elem !== null;
      });
   }

   // submit form
   const handleClick = async (timeState, availableSlot) => {
      try {
         console.log('file: index.js ~ line 54 ~ timeState, availableSlot', timeState, availableSlot);
         const temp = await addAppt({
            variables: {
               apptDate: timeState.date,
               apptTime: availableSlot,
               apptWidth: timeState.provider,
               confirmed: true,
            },
         });
         console.log('file: index.js ~ line 62 ~ temp', temp);
      } catch (e) {
         console.log('catch error');
         console.error(e);
      }
   };

   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <div className='card login-signup-card shadow-sm'>
         <div className='card-body'>
            <h3>Create Appointment</h3>
            <p className='text-selectdate'>{timeState.provider}</p>
            <p className='text-selectdate'>{timeState.specialty}</p>
            <p>{timeState.date}</p>
            {availableSlots.map((availableSlot) => (
               <Button
                  variant='outline-primary'
                  key={availableSlot}
                  // onClick={() => handleClick(timeState, availableSlot)}
               >
                  {availableSlot}
               </Button>
            ))}
            {/* {error && <div className='alert alert-danger'>Something went wrong while creating an Appt.</div>} */}
         </div>
      </div>
   );
};

export default TimeAvailable;
