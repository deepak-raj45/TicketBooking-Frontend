import React, { useEffect, useState } from 'react';
import './bookinghistory.css';

function BookingHistory() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch('http://localhost:5000/history')
      .then((response) => response.json())
      .then((data) => {
        setHistoryData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="booking-history-container">
      <h1>Booking History</h1>
      {historyData.length === 0 ? (
        <p>No bookings have been done.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Movie Name</th>
              <th>Theatre</th>
              <th>Location</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {historyData.map((booking, index) => (
              <tr key={index}>
                <td>{booking.username}</td>
                <td>{booking.movie_name}</td>
                <td>{booking.theatre}</td>
                <td>{booking.location}</td>
                {/* Add more table cells for additional data */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;
