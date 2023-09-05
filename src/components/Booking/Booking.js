import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

const numRows = 5;
const numSeatsPerRow = 10;
const seatPrice = 100;

function Booking() {
  const navigate = useNavigate();
  
  const cartItem = JSON.parse(sessionStorage.getItem('cartItem'));

  // Extract the theaterName from the cartItem
  const theaterName = cartItem ? cartItem.theatreName : 'Default Theater';
  
  //const { theaterName } =  sessionStorage.getItem(theaterName);
  //const theaterName = ''; // Hardcoded theater name for this example
  // Get the theater name from the URL params
  const [seats, setSeats] = useState(() => {
    const initialSeats = [];
    for (let row = 0; row < numRows; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < numSeatsPerRow; seat++) {
        rowSeats.push({ booked: false, selected: false, seatNumber: seat + 1 });
      }
      initialSeats.push(rowSeats);
    }
    return initialSeats;
  });

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const toggleSeat = (rowIndex, seatIndex) => {
    const updatedSeats = [...seats];
    const seat = updatedSeats[rowIndex][seatIndex];

    if (seat.booked) {
      // If the seat is already booked, do nothing (unclickable)
      return;
    }

    seat.selected = !seat.selected;

    if (seat.selected) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      const updatedSelectedSeats = selectedSeats.filter(
        selectedSeat => selectedSeat !== seat
      );
      setSelectedSeats(updatedSelectedSeats);
    }

    setSeats(updatedSeats);
  };

  const totalCost = selectedSeats.length * seatPrice;

  const handleNextClick = async () => {
    try {
      const selectedSeatsData = selectedSeats.map(seat => ({
        seatNumber: seat.seatNumber,
        rowIndex: seats.findIndex(row => row.includes(seat)),
        theater: theaterName,
      }));

      await axios.post(`https://easytickets.onrender.com/selected-seats?theatre=${theaterName}`, selectedSeatsData);

      alert(`Proceed to payment. Total Cost: ${totalCost} USD`);
      if(sessionStorage.getItem('username')!=null){
        navigate('/confirmation');
      }
      else{
        navigate('/')
      }
      
    } catch (error) {
      console.error('Error storing selected seats:', error);
    }
  };

  // Function to fetch and log already booked seats from the database
  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`https://easytickets.onrender.com/booked-seats?theatre=${theaterName}`);
      const bookedSeatsData = response.data;
      console.log('Booked Seats:', bookedSeatsData);

      // Update the booked seats in the state to reflect the fetched data
      const updatedSeats = [...seats];
      bookedSeatsData.forEach(bookedSeat => {
        updatedSeats[bookedSeat.rowIndex][bookedSeat.seatNumber - 1].booked = true;
      });
      setSeats(updatedSeats);

      setBookedSeats(bookedSeatsData);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
    }
  };

  // Call the fetchBookedSeats function when the component mounts
  useEffect(() => {
    fetchBookedSeats();
  }, [theaterName]); // Ensure it runs when the theaterName changes

  return (
    <div className="theater">
      <h1>{theaterName} Theater Seat Booking</h1>
      <div className="seat-container">
        {seats.map((row, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            <div className="row-letter">{String.fromCharCode(65 + rowIndex)}</div>
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seat.booked ? 'booked' : ''} ${seat.selected ? 'selected' : ''}`}
                onClick={() => toggleSeat(rowIndex, seatIndex)}
              >
                <FontAwesomeIcon icon={faCouch} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="screen-view">
        <div className="screen-content">Screen View</div>
      </div>

      <button
        className="next-button"
        onClick={handleNextClick}
      >
        Next ({totalCost} USD)
      </button>
    </div>
  );
}

export default Booking;
