import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
   // Logout event handler
   const logout = (event) => {
      event.preventDefault();
      Auth.logout();
   };

   console.log('Inside Header');
    return (
             <header>
         <div >

            <nav className='text-center'>
               {Auth.loggedIn() ? (
                  <>
                     <Link to='/'>Health-App</Link>
                     <a href='/' onClick={logout}>
                        Logout
                     </a>
                  </>
               ) : (
                  <>
                     <Link to='/login'>Login</Link>
                     <Link to='/signup'>Signup</Link>
                  </>
               )}
            </nav>
         </div>
      </header>
        
    
   );
};

export default Header;
