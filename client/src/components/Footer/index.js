import React from 'react';
//navigation in footer need to move only to other screens not on every page
import Navigation from '../Navigation'

const Footer = () => {
    return (
        <footer className="">
            <Navigation/>
            Copyright @ 2022 Group Project
        </footer>
    );
}

export default Footer;