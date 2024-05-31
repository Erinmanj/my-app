import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default function Bill() {
  const [selectedTab, setSelectedTab] = useState('OPD');
  const [bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')) || []);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/bill')
      .then(res => res.json())
      .then(data => setBill(data));
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
    <div className='billi'>
      <div className='billis'>
        <div className='bill'>
          <div className='bill-head'>Bill</div>
          <div className='billtabs'>
            <div className='tb1' onClick={() => setSelectedTab('OPD')}>OPD Bill</div>
            <div className='tb2' onClick={() => setSelectedTab('IPD')}>IPD Bill</div>
          </div>
          <Row className='bill-content'>
            <Col>
              {selectedTab === 'OPD' ? (
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Sr.no</th>
                      <th>Bill no.</th>
                      <th>Bill Date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      bill.map((billItem, index) => (
                        <tr key={index}>
                          <th>{billItem.id}</th>
                          <td>{billItem.number}</td>
                          <td>{formatDate(billItem.date)}</td>
                          <td>
                            <button 
                              onClick={(event) => handleViewButtonClick(event, billItem.image)} 
                              className='view-button'>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              ) : (
                <div>Data Not Found</div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
