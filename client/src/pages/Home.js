import React from 'react';
import { useQuery } from '@apollo/client';


import Auth from '../utils/auth';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
   const loggedIn = Auth.loggedIn();

   

   return (
      <main>
        
         {/* //* homepage button need to link */}
         <button className='btn w-100 btn-home' type='submit'>
             My Appointments
         </button>
         <button className='btn w-100 btn-home' type='submit'>
            Make Appointments
         </button>
         <button className='btn w-100 btn btn-home' type='submit'>
            Chat with Provider
         </button>
         <button className='btn w-100 btn-home' type='submit'>
            Reviews
         </button>
         <button className='btn w-100 btn-home' type='submit'>
            Donate
         </button>
         
         
      </main>
   );
};

export default Home;
