import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Image from './chartsandimages/logo.png';



import { Sidebar, Menu, MenuItem, SubMenu  } from "react-pro-sidebar";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {CalendarMonthRounded, HouseRounded,TimelineRounded } from '@mui/icons-material';
import { FaMoneyBillWave } from 'react-icons/fa';
import { PiPrescriptionFill } from 'react-icons/pi';
import { FaMoneyBillTransfer } from 'react-icons/fa6';





const MainSideBar = () => {
    const [ userCollapse, setUserCollapse ] = useState(false);

    const collapseSidebarCustom = () => {
      setUserCollapse(!userCollapse)
    }
    return (
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar className="sidebar" collapsed={userCollapse}>
        <Menu>
          <h>
            
                
                <img src={Image} alt="Hospital" className="hospital-logo" /> 
            
                
                
                </h>
        <div className='options'>
         <Link to='/'>
                <MenuItem
            icon={
              <HouseRounded
                onClick={() => {
                  collapseSidebarCustom();
                }}
              />
            }
          >  
          Dashboard
          </MenuItem>
          </Link>
          <Link to='/reports'>
          <MenuItem
            icon={<TimelineRounded/>}>Reports
           </MenuItem>
           </Link>
          <Link to='/appointment'>
            <MenuItem icon={<CalendarMonthRounded/>}>Appointment</MenuItem></Link>
            <Link to='/profile'>        
          <MenuItem icon={<AccountCircleIcon/>}>Profile</MenuItem></Link> 
          <Link to='/bill'>  
          <MenuItem icon={<FaMoneyBillWave/>}>Bill</MenuItem></Link>
          <Link to='/ipdeposit'>
          <MenuItem icon={<FaMoneyBillTransfer/>}>IP Deposit</MenuItem></Link>
          <Link to='/recieipt'>
          <MenuItem icon={<ReceiptRoundedIcon/>}>Recieipt</MenuItem></Link>
          <Link to='/prescription'>
          <MenuItem icon={<PiPrescriptionFill/>}>Prescription</MenuItem></Link>
          </div>
          
        </Menu>
      </Sidebar>
      </div>
    
    );
};

export default MainSideBar;



