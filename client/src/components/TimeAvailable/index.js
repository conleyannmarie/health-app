import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_GET_APPT_PROVIDER } from '../../utils/queries';

import dateFormat from '../../utils/dateOnlyFormat';
import Button from 'react-bootstrap/Button';

import { Redirect, useParams } from 'react-router-dom';
import { ADD_APPT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const TimeAvailable = (props) => {
   const provider = props.match.params.provider;
   const specialty = props.match.params.specialty;
   const date = dateFormat(props.match.params.date);

   const [timeState, setTimeState] = useState({
      provider: provider,
      specialty: specialty,
      date: date,
      availableSlots: null,
   });

   const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

   const { loading, data } = useQuery(QUERY_GET_APPT_PROVIDER, {
      variables: { apptWith: provider },
   });

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
   // //update state based on form input changes
   // const handleChange = (event) => {
   //    const { name, value } = event.target;

   //    setTimeState({
   //       ...timeState,
   //       [name]: value,
   //    });
   // };

   // const handleCheckChange = (event) => {
   //    let { name, value } = event.target;
   //    value = event.target.checked;

   //    setTimeState({
   //       ...timeState,
   //       [name]: value,
   //    });
   // };

   // //submit form
   // const handleFormSubmit = async (event) => {
   //    event.preventDefault();
   //    //use try/catch instead of promises to handle errors
   //    try {
   //       // execute addAppointment mutation and pass in variable data from form
   //       const { data } = await addAppointment({
   //          variables: { ...timeState },
   //       });
   //       Auth.login(data.addAppointment.token); //* set token to localStorage and reload page to homepage
   //    } catch (e) {
   //       console.error(e);
   //    }
   // };

   if (loading) {
      return <div>Loading...</div>;
   }
   return (
      <div className='card login-signup-card shadow-sm'>
         <div className='card-body'>
            <h3>Create Appointment</h3>
            <p>{timeState.provider}</p>
            <p>{timeState.specialty}</p>
            <p>{timeState.date}</p>

            {availableSlots.map((availableSlot) => (
               <Button variant='outline-primary' key={availableSlot}>
                  {availableSlot}
               </Button>
            ))}

            {/* {error && <div className='alert alert-danger'>Something went wrong while creating an Appt.</div>} */}
         </div>
      </div>
   );
};

export default TimeAvailable;
