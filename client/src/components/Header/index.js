import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

const Header = () => {

    // Logout event handler
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return (
        <header>
            <h5>
                {Auth.loggedIn() ? 
                    <Link className="site-logo" to="/">Health-App</Link>
                :
                    <Link className="site-logo" to="/login">Health-App</Link>
                }
            </h5>

           <nav>
               {Auth.loggedIn() && 
                <>
                    <span className="header-nav-link">
                        <Link to="/">{Auth.getProfile().data.username}</Link>
                    </span>
                    <span className="header-nav-link">
                        <span className="divider">|</span>
                    </span>
                    <span className="header-nav-link">
                        <a href="/login" onClick={logout}>
                            Logout
                        </a>
                    </span>
                </>
               }
           </nav>
            
        </header>
    );

}

export default Header;