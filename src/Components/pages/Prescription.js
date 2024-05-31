import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



export default function Prescription() {
 
    const [selectedImage, setSelectedImage] = useState(null);
  
    const [prescription, setPrescription] = useState(JSON.parse(localStorage.getItem('prescription')) || []);
    useEffect(() => {
      fetch('http://localhost:3000/prescription')
        .then(res => res.json())
        .then(data => setPrescription(data))
    }, []);
    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const yy = String(date.getFullYear());
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${dd}-${mm}-${yy}`;
    };
    const handleViewButtonClick = (event, image) => {
      event.preventDefault();
      const imageURL = `http://localhost:3000/${image}`
      window.open(imageURL, '_blank');
    };
  return (
    <div className='pres'>
      <div className='preso'>
    <div className='prescription'>
      <Container>
        <Row>
          <Col>
            <div className='prescription-head'>Prescription</div>
          </Col>
        </Row>
        <Row className='prescription-content'>
          <Col>
          
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th>Patient First Name</th>
                  <th>Patient Middle Name</th>
                  <th>Patient Last Name</th>
                  <th>Date</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                    {
                      prescription.map((prescriptionItem, index) => (
                        <tr key={index}>
                          <th>{prescriptionItem.id}</th>
                          <td>{prescriptionItem.doctor_name}</td>
                          <td>{prescriptionItem.speciality_name }</td>
                          <td>{prescriptionItem.patient_firstname}</td>
                          <td>{prescriptionItem.patient_middlename}</td>
                          <td>{prescriptionItem.patient_lastname}</td>
                          <td>{formatDate(prescriptionItem.date)}</td>
                          <td>
                          <button 
                              onClick={(event) => handleViewButtonClick(event, prescriptionItem.image)} 
                              className='view-button'>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
            
              
            </Table> 
           
          </Col>
        </Row>
      </Container>
    </div>
    </div>
    </div>
  );
}
