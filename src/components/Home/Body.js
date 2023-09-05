import React from 'react';
import { useNavigate } from 'react-router-dom';

function Body({ movie }) {
  const navigate = useNavigate();
  const cartItem = {
    movieName: movie.movie_name,
    theatreName: movie.theatre_name,
    date: movie.release_date,
    location: movie.theatre_location,
  };
console.log(sessionStorage.getItem('username'))
  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem('cartItem', JSON.stringify(cartItem));
    console.log('Retrieved Cart Item:', cartItem);
    
    if(sessionStorage.getItem('username')!=null){
      navigate('/booking');
    }
    else{
      navigate('/')
    }
  };

  return (
    <>
      <div class="box">
        <img src="https://imgs.search.brave.com/HHajI7zgDWV-C9S3_dfKBFkXCxmFLuDdgDvoSDKphVw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNi9UaWNr/ZXQtVHJhbnNwYXJl/bnQtSW1hZ2VzLVBO/Ry5wbmc" alt="" width={200} height={100}/>
        <h2>{movie.movie_name}</h2>
        <h3>@{movie.theatre_name}</h3>
        <h4>Location: {movie.theatre_location}</h4>
        <h4>Release Date: {movie.release_date}</h4>
        <button className="btn" type="submit" onClick={handleSubmit}>Book Now</button>
      </div>
    </>
  );
}

export default Body;
