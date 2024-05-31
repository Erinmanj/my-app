
import React from 'react';

import { AppBar } from '@mui/material';
import Toolbar from '@mui/material';
import { FaBell } from 'react-icons/fa';
import Image from './pages/icon.png';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Header = () => {
    return (
        
            <header>
            <div className="header">
            <div className='header1'>
            <img src={Image} alt="Image" className="account-logo" /> 
            <div className='header2'>
            <h2>Welcome</h2></div>
            <div className='header4'>
            <IconButton color="inherit">
      
        <NotificationsIcon />
   
    </IconButton>
            </div>
            
            </div>
            <div className='header3'>Ms.Erin Manjus
            </div>
            
            
            </div>
            
            </header>
            
        
    );
};

export default Header;