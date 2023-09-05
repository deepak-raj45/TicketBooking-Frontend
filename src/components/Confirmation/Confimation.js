import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import emailjs from 'emailjs-com';
import photo from './photo.png';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './Confirmation.css';

function Confirmation(props) {
  const { movieName, showtime, seatDetails } = props;
  const [emailSent, setEmailSent] = useState(false);
  const history = useNavigate(); // Initialize useHistory

  const handleConfirm = async (e) => {
    e.preventDefault();

    // Generate the QR code as a Data URI
    

    // Use the base64-encoded image data for photo.png
    const base64data = photo.split(',')[1];

    const emailData = {
      to_email: 'gowsikkan.s2001@gmail.com',
      subject: 'Booking Confirmation',
      movieName,
      showtime,
      seatDetails,
      attachments: [
        { name: 'photo.png', data: base64data }, // 'logo.png' should be the filename
      ],
    };

    try {
      const serviceID = 'service_qi5tfdo'; // Replace with your service ID
      const templateID = 'template_mbf3lym'; // Replace with your template ID
      const userID = '40Fa-WqgzosJ-S6mw'; 
      const response = await emailjs.send(
        serviceID,
        templateID,
        emailData,
        userID
      );

      console.log('Email sent!', response);
      setEmailSent(true);

      // Redirect to the homepage after successful email sending
      alert('Booking confirmed, returning to homepage');
      history('/home');
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Booking Confirmation</h1>
      <div>
        <h2>Movie Details:</h2>
        <p>Movie Name: {movieName}</p>
        <p>Showtime: {showtime}</p>
        <p>Seat Details: {seatDetails}</p>
      </div>
      <div>
        <h2>QR Code:</h2>
        <QRCode value={`${movieName} - ${showtime}\n${seatDetails}`} />
      </div>
      {emailSent ? (
        <p>Email has been sent successfully!</p>
      ) : (
        <button className="button" onClick={handleConfirm}>Confirm</button>
      )}
    </div>
  );
}

export default Confirmation;
