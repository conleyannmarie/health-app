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
                  <a className='btn w-100 btn-home' href="# "role='button'>
                     <i className=' bi bi-calendar-event'></i> My Appointments
                  </a>
                  <a className='btn w-100 btn-home' href="/datepicker" role='button'>
                     <i className='bi bi-calendar-plus me-5' ></i> Make Appointments
                  
                  </a>
                  <a className='btn w-100 btn btn-home' href="#" role='button'>
                     <i className='d-flex  bi bi-chat-left-dots me-5'></i>Message
                  </a>
                  <a className='btn w-100 btn-home' href="#" role='button'>
                     <i className='d-flex bi bi-clipboard-data me-5'></i> <span className = "ps-5 ">Reviews</span>
                  </a>
                  <a className='btn w-100 btn-home ' href="#" role='button'>
                     <i className='bi bi-wallet2 me-5'></i>Donate
                  </a>
               </div>
            )}
         </div>
      </main>
   );
};

export default Home;
