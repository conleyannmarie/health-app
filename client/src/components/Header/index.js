import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
   // Logout event handler
   const logout = (event) => {
      event.preventDefault();
      Auth.logout();
   };

   return (
      <header>
          <h5>
              {Auth.loggedIn() ? 
                  <Link to="../">Health-App</Link>
              :
                  <Link to="/login">Health-App</Link>
              }
          </h5>

         <nav>
             {Auth.loggedIn() && 
              <>
              <span className="header-nav-link">
                        <span>{Auth.getProfile().data.username}</span>
                    </span>
                    <span className="header-nav-link">
                        <span>|</span>
                    </span>
                    <span className="header-nav-link"></span>
              
                      <a href="/login" onClick={logout}>
                          Logout
                      </a>
                  
              </>
             }
         </nav>
          
      </header>
      
        
    
   );
};

export default Header;
