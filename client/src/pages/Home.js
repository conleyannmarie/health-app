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
         <i class="bi bi-calendar-event"></i>My Appointments
         </button>
         <button className='btn w-100 btn-home' type='submit'>
         <i class="bi bi-calendar-plus"></i> Make Appointments
         </button>
         <button className='btn w-100 btn btn-home' type='submit'>
         <i class="bi bi-chat-left-dots"></i>Message
         </button>
         <button className='btn w-100 btn-home' type='submit'>
         <i class="bi bi-clipboard-data"></i>Reviews
         </button>
         <button  className='btn w-100 btn-home ' type='submit'>
         <i class="bi bi-wallet2"></i>Donate
         </button>
         
         
         
      </main>

   );
};


export default Home;
