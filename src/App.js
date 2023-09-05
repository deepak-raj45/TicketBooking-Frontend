import React from 'react';
import './App.css';
import Booking from "./components/Booking/Booking";
import Home from "./components/Home/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Confimation from './components/Confirmation/Confimation';
import BookingHistory from './components/History/bookinghistory';
import Header from './components/Home/Header';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';


function App() {
  return (
    <Router>
    <div className='App'>
    
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confimation />} />
        <Route path="/history" element={<BookingHistory/>} />
           
      </Routes>
    </div>
  </Router>
  );
}

export default App;
