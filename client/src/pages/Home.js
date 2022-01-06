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
                  <a className='btn w-100 btn-home ' href='# ' role='button'>
                     <i className=' bi bi-calendar-event fs-1 me-3'></i> My Appointments
                  </a>
                  <a className='btn w-100 btn-home ' href='/selectprovider' role='button'>
                     <i className=' bi bi-calendar-plus fs-1 me-3'></i> Make Appointments
                  </a>
                  <a className='btn w-100 btn btn-home ' href='#' role='button'>
                     <i className=' bi bi-chat-left-dots fs-1 me-3'></i>Message
                  </a>
                  <a className='btn w-100 btn-home ' href='#' role='button'>
                     <i className=' bi bi-clipboard-data fs-1 me-3 '></i> Reviews
                  </a>
                  <a className=' btn w-100 btn-home ' href='#' role='button'>
                     <i className='  text-left bi bi-wallet2 fs-1 me-3 '></i> Donate
                  </a>
               </div>
            )}
         </div>
      </main>
   );
};

export default Home;
