import React from 'react';
//import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
//import Login from './Login';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
   const loggedIn = Auth.loggedIn();

   return (
      <main>
         <div>
            {/* homepage button need to link */}
            {loggedIn && (
               <div>
                  <button className='btn w-100 btn-home' type='submit'>
                     <i className='bi bi-calendar-event'></i>My Appointments
                  </button>
                  <button className='btn w-100 btn-home' type='submit'>
                     <i className='bi bi-calendar-plus'></i> Make Appointments
                     <p>
                        <Link to='/datepicker'>Pick a Date</Link> instead
                     </p>
                  </button>
                  <button className='btn w-100 btn btn-home' type='submit'>
                     <i className='bi bi-chat-left-dots'></i>Message
                  </button>
                  <button className='btn w-100 btn-home' type='submit'>
                     <i className='bi bi-clipboard-data'></i>Reviews
                  </button>
                  <button className='btn w-100 btn-home ' type='submit'>
                     <i className='bi bi-wallet2'></i>Donate
                  </button>
               </div>
            )}
         </div>
      </main>
   );
};

export default Home;
