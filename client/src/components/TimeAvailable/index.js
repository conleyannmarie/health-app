import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import { ADD_APPT } from '../../utils/mutations';
import { QUERY_GET_APPT_PROVIDER } from '../../utils/queries';
import Auth from '../../utils/auth';

const TimeAvailable = (props) => {
   const provider = props.match.params.provider;
   const specialty = props.match.params.specialty;
   const date = props.match.params.date;
   const [timeState, setTimeState] = useState({
      provider: provider,
      specialty: specialty,
      date: date,
   });

   const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

   const { loading, data } = useQuery(QUERY_GET_APPT_PROVIDER, {
      variables: { apptWith: provider },
   });

   console.log('file: TimeAvailability.index.js ~ line 24 ~ data', data);
   // const apptSlots = timeSlots.map(elem =>
   // {

   // });
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

            {/* {error && <div className='alert alert-danger'>Something went wrong while creating an Appt.</div>} */}
         </div>
      </div>
   );
};

export default TimeAvailable;
