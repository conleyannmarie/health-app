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
      specialty: 'your specialty',
      npiNumber: 'your 10 digit npi number',
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
      <div className="card login-signup-card shadow-sm">
        <div className="card-body">
          <h4>Create Account</h4>
          <hr></hr>
          {error && (
            <div className="alert alert-danger">
              Something went wrong while signing up.
            </div>
          )}
          <form onSubmit={handleFormSubmit} className="login-form">
          <select id = "dropdown">
             
          <option value="N/A">User</option>
          <option value="1">Patient</option>
          <option value="2">Doctor</option>
          </select>

            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Password</label>
                <input
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn w-100 btn-default" type="submit">
              Submit
            </button>
          </form>
  
                  {error && <div>Sign up failed</div>}
               </div>
            </div>
            
      
   
   );
};

export default Signup;
