import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpeciality] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedFacility, setSelectedFacility] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState([]);
  const [viewMode, setViewMode] = useState(false);
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeToBook, setTimeToBook] = useState('');
  const [detailsofPatient, setDetailsofPatient] = useState(JSON.parse(localStorage.getItem('detailsofpatient')) || []);
  const [appointment, setAppointment] = useState(JSON.parse(localStorage.getItem('appointment')) || []);
  const [disabledTimeSlots, setDisabledTimeSlots] = useState(JSON.parse(localStorage.getItem('disabledTimeSlots')) || []);

  const handleBubbleClick = () => {
    setShowOptions(!showOptions);
    setViewMode(false);
    setSelectedAppointmentIndex(null);
  };

  const handleBubbleClick1 = () => {
    setViewMode(!viewMode);
    setShowOptions(false);
    setSelectedAppointmentIndex(null);
  };

  useEffect(() => {
    // Fetch specialties from backend
    axios.get('http://localhost:3000/speciality')
      .then(res => {
        setSpeciality(res.data);
      })
      .catch(error => {
        console.error('There was an error fetching the specialties!', error);
      });
  }, []);

  const handleSpecialityChange = (e) => {
    const selectedSpeciality = e.target.value;
    setSelectedSpeciality(selectedSpeciality);
    axios.get(`http://localhost:3000/doctor?speciality_id=${selectedSpeciality}`)
      .then(res => {
        setDoctors(res.data);
      })
      .catch(error => {
        console.error('There was an error fetching the doctors!', error);
      });
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleViewButtonClick = () => {
    if (
      selectedSpeciality !== '' &&
      selectedDoctor !== '' &&
      selectedFacility !== '' &&
      selectedDate !== ''
    ) {
      const timeSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const startHour = hour < 10 ? `0${hour}` : hour;
          const startMinute = minute === 0 ? '00' : minute;
          const endHour = minute === 45 ? hour + 1 : hour;
          const endMinute = minute === 45 ? '00' : minute + 15;
          const formattedEndHour = endHour < 10 ? `0${endHour}` : endHour;
          const formattedEndMinute = endMinute === 0 ? '00' : endMinute;
          timeSlots.push(`${startHour}:${startMinute} to ${formattedEndHour}:${formattedEndMinute}`);
        }
      }
      setSelectedTime(timeSlots);
      setViewMode(false);
      setSelectedAppointmentIndex(null);
    }
  };

  const handleTimeSlotSelect = (time) => {
    setTimeToBook(time);
    setShowConfirmation(true);
  };

  useEffect(() => {
    fetch('http://localhost:3000/detailsofpatient')
      .then(res => res.json())
      .then(data => setDetailsofPatient(data));
  }, []);

  const confirmBooking = () => {
    console.debug("abc");
    console.log("creating");
    const appointment = {
      id: appointmentDetails.length + 1,
      time: timeToBook,
      speciality: selectedSpeciality,
      doctor: selectedDoctor,
      facility: selectedFacility,
      date: selectedDate,
      status: 'upcoming',
      patient: detailsofPatient.id,
    };
    const appointments = [...appointmentDetails, appointment];
    setAppointmentDetails(appointments);
    localStorage.setItem('appointmentDetails', JSON.stringify(appointments));

    // Save to backend
    axios.post('http://localhost:3000/appointment', appointment)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error saving the appointment!', error);
      });

    const newDisabledTimeSlots = [...disabledTimeSlots, {
      speciality: selectedSpeciality,
      doctor: selectedDoctor,
      date: selectedDate,
      time: timeToBook
    }];
    setDisabledTimeSlots(newDisabledTimeSlots);
    localStorage.setItem('disabledTimeSlots', JSON.stringify(newDisabledTimeSlots));

    setShowConfirmation(false);
  };

  useEffect(() => {
    fetch('http://localhost:3000/appointments')
      .then(res => res.json())
      .then(data => setAppointment(data));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yy}`;
  };

  const isTimeSlotDisabled = (time) => {
    const [startTime] = time.split(' to ');
    const appointmentDateTime = new Date(`${selectedDate}T${startTime}:00`);
    const currentDateTime = new Date();

    return (
      currentDateTime > appointmentDateTime ||
      disabledTimeSlots.some(
        (slot) =>
          slot.speciality === selectedSpeciality &&
          slot.doctor === selectedDoctor &&
          slot.date === selectedDate &&
          slot.time === time
      ) ||
      appointmentDetails.some(
        (appointment) =>
          appointment.speciality === selectedSpeciality &&
          appointment.doctor === selectedDoctor &&
          appointment.date === selectedDate &&
          appointment.time === time
      )
    );
  };

 

  useEffect(() => {
    const existingAppointments = JSON.parse(localStorage.getItem('appointmentDetails')) || [];
    setAppointmentDetails(existingAppointments);

  }, []);

  return (
    <Container>
      <div className='appoi'>
        <div className='appois'>
          <Row className='appo'>
            <Col>
              <div className='app-head'>
                Appointment
              </div>
            </Col>
          </Row>
          <Row className='appos'>
            <Col>
              <div className='appos1' onClick={handleBubbleClick1}>
                View Appointment
              </div>
              <div className='appos2' onClick={handleBubbleClick}>
                Create Appointment
              </div>

              {showOptions && (
                <Row className='options-row'>
                  <Col>
                    <div className='faci'>
                      <label>Facility:</label>
                    </div>
                    <div className='fac'>
                      <select onChange={handleFacilityChange} className='form-control'>
                        <option>Select</option>
                        <option value='Rajagiri Hospital'>Rajagiri Hospital</option>
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className='spec'>
                      <label>Speciality:</label>
                      <select onChange={handleSpecialityChange} className='form-control'>
                        <option>Select</option>
                        {speciality.map((speciality, index) => (
                          <option key={index} value={speciality.id}>
                            {speciality.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className='doci'>
                      <label>Doctor:</label>
                    </div>
                    <div className='doc'>
                      <select onChange={handleDoctorChange} className='form-control'>
                        <option>Select</option>
                        {doctors.map((doctor, index) => (
                          <option key={index} value={doctor.id}>
                            {doctor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <div className='datei'>
                      <label>Date:</label>
                    </div>
                    <div className='date'>
                      <input
                        type='date'
                        onChange={handleDateChange}
                        className='form-control'
                        min={new Date().toISOString().split('T')[0]}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                      />
                    </div>
                  </Col>
                  <Col>
                    <button onClick={handleViewButtonClick} className='view-button'>
                      View
                    </button>
                  </Col>
                </Row>
              )}
              {viewMode && (
                <Row className='appointment-details'>
                  <Col>
                    <h2>Appointments</h2>
                    <Table bordered hover>
                      <thead>
                        <tr>
                          <th>Sr.no</th>
                          <th>Time</th>
                          <th>Date</th>
                          <th>Doctor</th>
                          <th>Patient First Name</th>
                          <th>Patient Middle Name</th>
                          <th>Patient Last Name</th>
                          <th>Speciality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointment.map((appointment, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{appointment.time}</td>
                            <td>{formatDate(appointment.date)}</td>
                            <td>{appointment.doctor_name}</td>
                            <td>{appointment.patient_firstname}</td>
                            <td>{appointment.patient_middlename}</td>
                            <td>{appointment.patient_lastname}</td>
                            <td>{appointment.speciality_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
              {showOptions && selectedTime.length > 0 && (
                <Row className='time-slots'>
                  {selectedTime.map((time, index) => (
                    <Col key={index}>
                      <button
                        className='time-slot'
                        onClick={() => handleTimeSlotSelect(time)}
                        disabled={isTimeSlotDisabled(time)}
                      >
                        {time}
                      </button>
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
          <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to book an appointment?</Modal.Body>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShowConfirmation(false)}>
                Cancel
              </Button>
              <Button variant='primary' onClick={confirmBooking}>
                Proceeding
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
}
