import { AccountCircleRounded, CalendarMonthRounded, HouseRounded, TimelineRounded } from '@mui/icons-material'
import ReceiptRounded from '@mui/icons-material/ReceiptRounded';
import React from 'react'
import { FaMoneyBillWave } from 'react-icons/fa';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import { PiPrescriptionFill } from 'react-icons/pi';
import {Link} from 'react-router-dom';


export default function Dashboard(){
 
  

  return (

    <div className='dashb'>
      <div className='dashbi'>
    <div className='bubble'>
    <Link to='/reports'>
    <div className='bubble1'>
        <div>{<TimelineRounded/>}</div>
        <div>Reports</div>
        </div>
        </Link>
  <Link to='/appointment'>
    <div className='bubble2'>
     <div>{<CalendarMonthRounded/>}</div>
     <div>Appointment</div>
    </div>
    </Link>
    <Link to='/profile'>
    <div className='bubble3'>
      <div>{<AccountCircleRounded/>}</div>
      <div>Profile</div>
    </div>
    </Link>
    <Link to='/bill'>
    <div className='bubble4'>
      <div>{<FaMoneyBillWave/>}</div>
      <div>Bill</div>
    </div>
    </Link>
    <Link to='/ipdeposit'>
    <div className='bubble5'>
      <div>{<FaMoneyBillTransfer/>}</div>
      <div>IP Deposit</div>
    </div>
    </Link>
    <Link to='/recieipt'>
    <div className='bubble6'>
      <div>{<ReceiptRounded/>}</div>
      <div>Recieipt</div>
    </div>
    </Link>
    <Link to='/prescription'>
    <div className='bubble7'>
      <div>{}<PiPrescriptionFill/></div>
      <div>Prescription</div>
    </div>
    </Link>
    </div>
    </div>
    </div>
  );

};





