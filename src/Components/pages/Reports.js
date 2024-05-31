import React, { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

function Reports() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [report, setReport] = useState(JSON.parse(localStorage.getItem('report')) || []);
  useEffect(() => {
    fetch('http://localhost:3000/report')
      .then(res => res.json())
      .then(data => setReport(data))
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

  const [activeTab, setActiveTab] = useState('Lab Reports');

  const renderContent = () => {
    if (activeTab === 'Lab Reports') {
      return (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Order No.</th>
              <th>Test Name</th>
              <th>Date</th>
              <th>View</th>
              <th>Uploaded Report</th>
            </tr>
          </thead>
          <tbody>
                    {
                      report.map((reportItem, index) => (
                        <tr key={index}>
                          <th>{reportItem.id}</th>
                          <td>{reportItem.number}</td>
                          <td>{reportItem.name}</td>
                          <td>{formatDate(reportItem.date)}</td>
                          <td>
                          <button 
                              onClick={(event) => handleViewButtonClick(event, reportItem.image)} 
                              className='view-button'>
                              View
                            </button>
                          </td>
                          <td>Not Available</td>
                        </tr>
                      ))
                    }
                  </tbody>
        </Table>
      );
    } else {
      return <div>Data not found</div>;
    }
  };

  return (
    <div className='rep'>
      <div className='repo'>
    <div>
      <div className='reports'>
        <div className='reports-head'>Reports</div>
      </div>
      <div className='reportstabs'>
        <div className='rtb1' onClick={() => setActiveTab('Lab Reports')}>Lab Reports</div>
        <div className='rtb2' onClick={() => setActiveTab('Diagnostic Reports')}>Diagnostic Reports</div>
        <div className='rtb3' onClick={() => setActiveTab('Discharge Summary')}>Discharge Summary</div>
      </div>
      <Row className='reports-content'>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
}

export default Reports;
