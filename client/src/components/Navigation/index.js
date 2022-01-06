import React from 'react';

const Navigation = () => {
   return (
      <nav className='navbar fixed-bottom navbar-expand-lg navbar-dark bg-primary'>
         <form className='container-fluid justify-content-evenly'>
            {/* Home tab */}
            <a className='btn  btn-outline-light btn-lg' href='/' role='button'>
               {' '}
               <i className='bi bi-house'></i>
            </a>

            {/* calendar */}
            <a className='btn btn-outline-light btn-lg' href='#' role='button'>
               {' '}
               <i className='bi bi-calendar-event '></i>{' '}
            </a>
            {/* Schedule */}
            <a className='btn btn-outline-light btn-lg' href='/selectprovider' role='button'>
               {' '}
               <i className='bi bi-calendar-plus'></i>{' '}
            </a>

            {/* Messages tab */}
            <a className='btn btn-outline-light btn-lg ' href='#' role='button'>
               {' '}
               <i className='bi bi-chat-left-dots'></i>
            </a>

            {/* review tab */}
            <a className='btn btn-outline-light btn-lg ' href='#' role='button'>
               {' '}
               <i className='bi bi-clipboard-data'></i>{' '}
            </a>

            {/* Donate tab */}
            <a className='btn btn-outline-light btn-lg' href='#' role='button'>
               {' '}
               <i className='bi bi-wallet2'></i>
            </a>
         </form>
      </nav>
   );
};

export default Navigation;
