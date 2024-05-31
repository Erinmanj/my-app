import React, { useState , useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';


export default function Receipt() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [reciept, setReciept] = useState(JSON.parse(localStorage.getItem('reciept')) || []);
  useEffect(() => {
    fetch('http://localhost:3000/reciept')
      .then(res => res.json())
      .then(data => setReciept(data))
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

  const [activeTab, setActiveTab] = useState('OP Walee Tree Deposit');

  const renderContent = () => {
    if (activeTab === 'OP Walee Tree Deposit') {
      return (
        <Table bordered hover>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Bill No.</th>
              <th>Bill Date</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
                    {
                      reciept.map((recieptItem, index) => (
                        <tr key={index}>
                          <th>{recieptItem.id}</th>
                          <td>{recieptItem.number}</td>
                          <td>{formatDate(recieptItem.date)}</td>
                          <td>
                          <button 
                              onClick={(event) => handleViewButtonClick(event, recieptItem.image)} 
                              className='view-button'>
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
        </Table>
      );
    } else {
      return <div>Data Not Found</div>;
    }
  };

  return (
    <div className='recip'>
      <div className='recipo'>
    <div className='reci'>
      <div className='reci-head'>Receipt</div>
      <div className='tabs'>
        <div className='tab1' onClick={() => setActiveTab('OP Walee Tree Deposit')}>OP Walee Tree Deposit</div>
        <div className='tab2' onClick={() => setActiveTab('IP Deposit')}>IP Deposit</div>
        <div className='tab3' onClick={() => setActiveTab('OP Deposit Refund')}>OP Deposit Refund</div>
        <div className='tab4' onClick={() => setActiveTab('IP Deposit Refund')}>IP Deposit Refund</div>
      </div>
      <Row className='reciept-content'>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </div>
    </div>
    </div>
  );
}
