import React from "react";

import Auth from '../utils/auth'

import 'bootstrap/dist/css/bootstrap.min.css'

const Messages = () => {
    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <h1>Schedule An Appointment</h1>
            <div>
                <h3>Patient Name</h3>
            </div>
        </main>
    );
};

export default Messages;