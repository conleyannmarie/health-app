import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
   const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
      isProvider: false,
      specialty: '',
      npiNumber: '',
   });

   const [addUser, { error }] = useMutation(ADD_USER);

   // update state based on form input changes
   const handleChange = (event) => {
      const { name, value } = event.target;

      setFormState({
         ...formState,
         [name]: value,
      });
   };

   const handleCheckChange = (event) => {
      let { name, value } = event.target;
      value = event.target.checked;

      setFormState({
         ...formState,
         [name]: value,
      });
   };

   // submit form
   const handleFormSubmit = async (event) => {
      event.preventDefault();
      //use try/catch instead of promises to handle errors
      try {
         // execute addUser mutation and pass in variable data from form
         const { data } = await addUser({
            variables: { ...formState },
         });
         Auth.login(data.addUser.token); //* set token to localStorage and reload page to homepage
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <div className='card login-signup-card shadow-sm'>
         <div className='card-body'>
            <h4>Create Account</h4>
            <hr></hr>

            <form onSubmit={handleFormSubmit} className='login-form'>
               <div className='row'>
                  <div className='col-12 mb-3'>
                     {/* <label className='form-label'>Username</label> */}
                     <input
                        className='form-control'
                        placeholder='Username'
                        name='username'
                        type='username'
                        id='username'
                        value={formState.username}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className='row'>
                  <div className='col-12 mb-3'>
                     {/* <label className='form-label'>Email</label> */}
                     <input
                        className='form-control'
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className='row'>
                  <div className='col-12 mb-3'>
                     {/* <label className='form-label'>Password</label> */}
                     <input
                        className='form-control'
                        placeholder='Password'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                     />
                  </div>
               </div>
               <div className='row'>
                  <div className='col-12 mb-3'>
                     <label className='form-label'>Check if you are a provider: </label>
                     <input
                        className='form-checkbox'
                        placeholder='User Type'
                        name='isProvider'
                        type='checkbox'
                        id='isProvider'
                        value={formState.isProvider}
                        onChange={handleCheckChange}
                     />
                  </div>
               </div>
               {formState.isProvider && (
                  <input
                     className='form-control'
                     placeholder='Specialty'
                     name='specialty'
                     type='specialty'
                     id='specialty'
                     value={formState.specialty}
                     onChange={handleChange}
                  />
               )}
               {formState.isProvider && (
                  <input
                     className='form-control'
                     placeholder='NPI Number'
                     name='npiNumber'
                     type='npiNumber'
                     id='npiNumber'
                     value={formState.npiNumber}
                     onChange={handleChange}
                  />
               )}
               <button className='btn w-100 btn-default' type='submit'>
                  Submit
               </button>
            </form>

            {error && <div className='alert alert-danger'>Something went wrong while signing up.</div>}
         </div>
      </div>
   );
};

export default Signup;
