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
      console.log('file: Signup.js ~ line 21 ~ event.target', event.target);
      console.log('file: Signup.js ~ line 22 ~ name', name);
      console.log('file: Signup.js ~ line 23 ~ value', value);

      setFormState({
         ...formState,
         [name]: value,
      });
   };

   const handleCheckChange = (event) => {
      let { name, value } = event.target;
      value = event.target.checked;
      console.log('file: Signup.js ~ line 34 ~ event.target', event.target);
      console.log('file: Signup.js ~ line 35 ~ name', name);
      console.log('file: Signup.js ~ line 36 ~ value', value);

      setFormState({
         ...formState,
         [name]: value,
      });
   };

   // submit form
   const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log('inside handleFormSubmit');
      //use try/catch instead of promises to handle errors
      try {
         // execute addUser mutation and pass in variable data from form
         console.log('file: Signup.js ~ line 34 ~ formState', formState);
         const { data } = await addUser({
            variables: { ...formState },
         });
         console.log('file: Signup.js ~ line 38 ~ data', data);
         Auth.login(data.addUser.token); //* set token to localStorage and reload page to homepage
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <main className='flex-row justify-center mb-4'>
         <div className='col-12 col-md-6'>
            <div className='card'>
               <h4 className='card-header'>Sign Up</h4>
               <div className='card-body'>
                  <form onSubmit={handleFormSubmit}>
                     <input
                        className='form-input'
                        placeholder='Your username'
                        name='username'
                        type='username'
                        id='username'
                        value={formState.username}
                        onChange={handleChange}
                     />
                     <input
                        className='form-input'
                        placeholder='Your email'
                        name='email'
                        type='email'
                        id='email'
                        value={formState.email}
                        onChange={handleChange}
                     />
                     <input
                        className='form-input'
                        placeholder='******'
                        name='password'
                        type='password'
                        id='password'
                        value={formState.password}
                        onChange={handleChange}
                     />
                     <div className='isProvider'>
                        <label>Check if you are a provider: </label>

                        <input
                           className='form-input'
                           placeholder='user type'
                           name='isProvider'
                           type='checkbox'
                           id='isProvider'
                           value={formState.isProvider}
                           onChange={handleCheckChange}
                        />
                     </div>
                     {formState.isProvider && (
                        <input
                           className='form-input'
                           placeholder='specialty'
                           name='specialty'
                           type='specialty'
                           id='specialty'
                           value={formState.specialty}
                           onChange={handleChange}
                        />
                     )}
                     {formState.isProvider && (
                        <input
                           className='form-input'
                           placeholder='NPI Number'
                           name='npiNumber'
                           type='npiNumber'
                           id='npiNumber'
                           value={formState.npiNumber}
                           onChange={handleChange}
                        />
                     )}
                     <button className='btn d-block w-100' type='submit'>
                        Submit
                     </button>
                  </form>
                  {error && <div>Sign up failed</div>}
               </div>
            </div>
         </div>
      </main>
   );
};

export default Signup;
