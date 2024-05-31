import React from 'react';
import { useState } from 'react';

export default function IPDeposit() {
  const [IPNumber, setIPNumberStatus] = useState('');
  const[Amount, setAmountStatus]=useState('');
  const handlePayButtonClick = () => {

  }
  return (
    <div className='ipdep'>
      <div className='ipdepo'>
    <div className='ip-deposit'>
    <div className='ipd-head'>IPDeposit</div>
    <div className='ipd1'>
      <div className='ipdd'>
                <div className='ipid'>IP Number</div>
                <div className='ipid1'>
                <input type="text" value={IPNumber} onChange={(e) => setIPNumberStatus(e.target.value)} />
                </div>
                </div>
  
              
   <div className='amd'>
      <div className='am'>Amount</div>
      <div className='am1'>
      <input type="text" value={Amount}  onChange={(e) => setAmountStatus(e.target.value)}/>
      </div>
      </div>
      
                  <button onClick={handlePayButtonClick} className="pay-button">Pay Now</button>
            
      </div>
      </div>
      </div>
      </div>
  
  )
}
