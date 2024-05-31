import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from './icon.png';
import Image1 from './image.png';

const PatientDetails = () => {
  const [isFatherChecked, setIsFatherChecked] = useState(false);
  const [isSpouseChecked, setIsSpouseChecked] = useState(false);
 
  const [DetailsofPatient, setDetailsofPatient] = useState(JSON.parse(localStorage.getItem('detailsofpatient')) || []);


  useEffect(() => {
    fetch('http://localhost:3000/detailsofpatient')
      .then(res => res.json())
      .then(data => setDetailsofPatient(data)); 
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yy}`;
  };

  return (
    <div className='prof'>
      <div className='profi'>
        <div className="patient-details-box">
          <div className='profile-head'>
            <h>Profile</h>
          </div>
          <div className='hii'>
            <img src={Image} alt="profile" className="profile-icon"/>
            <h>Patient Details</h>
          </div>
          <Container>
            <Row>
              <Col>
                <div className="input-box">
                  <div className='ip1'>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={DetailsofPatient.firstname} />
                  </div>
                  <div className='ip2'>
                    <label>Middle Name:</label>
                    <input type="text" name="middleName" value={DetailsofPatient.middlename} />
                  </div>
                  <div className='ip3'>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={DetailsofPatient.lastname} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="input-box">
                  <div className='ip1'>
                    <label>Gender:</label>
                    <input type="text" value={DetailsofPatient.gender} />
                  </div>
                  <div className='ip2'>
                    <label>Date of Birth:</label>
                    <input type="text" value={formatDate(DetailsofPatient.dob)} />
                  </div>
                  <div className='ip3'>
                    <label>Age:</label>
                    <input type="text" value={DetailsofPatient.age} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="input-box">
                  <div className='ip1'>
                    <label>Marital Status:</label>
                    <input type="text" value={DetailsofPatient.maritalst} />
                  </div>
                  <div className='ip2'>
                    <label>Mother's Maiden Name:</label>
                    <input type="text" value={DetailsofPatient.maidenname} />
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="checkbox">
                  <div className='ck1'>
                    <input type="checkbox" checked={isFatherChecked} onChange={() => setIsFatherChecked(!isFatherChecked)} />
                  </div>
                  <div className='ck3'>
                    <label>Father</label>
                  </div>
                  <div className='ck2'>
                    <input type="checkbox" checked={isSpouseChecked} onChange={() => setIsSpouseChecked(!isSpouseChecked)} />
                  </div>
                  <div className='ck4'>
                    <label>Spouse</label>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="patient-address-box">
                  <div className='adb'>
                    <img src={Image1} alt="profile" className="home-icon"/>
                    <h>Address Details</h>
                  </div>
                  <div className='add'>
                    <div className='ad1'>
                      <label>House/Flat No.:</label>
                      <input type="text" value={DetailsofPatient.flatno} />
                    </div>
                    <div className='ad2'>
                      <label>Country:</label>
                      <input type="text" value={DetailsofPatient.country} />
                    </div>
                    <div className='ad3'>
                      <label>City:</label>
                      <input type="text" value={DetailsofPatient.ct} />
                    </div>
                  </div>
                  <div className='add1'>
                    <div className='ad4'>
                      <label>Other Locality:</label>
                      <input type="text" value={DetailsofPatient.otherlocality} />
                    </div>
                    <div className='ad5'>
                      <label>Pin:</label>
                      <input type="text" value={DetailsofPatient.pin} />
                    </div>
                    <div className='ad6'>
                      <label>State:</label>
                      <input type="text" value={DetailsofPatient.state} />
                    </div>
                  </div>
                  <div className='add2'>
                    <div className='ad7'>
                      <label>Locality:</label>
                      <input type="text" value={DetailsofPatient.locality} />
                    </div>
                    <div className='ad8'>
                      <label>E-mail:</label>
                      <input type="text" value={DetailsofPatient.email} />
                    </div>
                  </div>
                  <div className='add3'>
                    <div className='ad9'>
                      <label>Telephone:</label>
                      <input type="text" value={DetailsofPatient.tele} />
                    </div>
                    <div className='ad10'>
                      <label>Mobile:</label>
                      <input type="text" value={DetailsofPatient.mobile} />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
