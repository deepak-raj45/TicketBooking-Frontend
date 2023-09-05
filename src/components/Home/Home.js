import Body from './Body'

import Header from './Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');


  useEffect(() => {
    axios.get('https://easytickets.onrender.com/data') // Replace with your server's URL
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

    // Create an array of years starting from 1975 to the current year
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: currentYear - 1974 }, (_, index) => (currentYear - index).toString());
  
    // Filter movies by search term and year
    const filteredData = data.filter((movie) => {
      const matchesSearchTerm = movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === '' || new Date(movie.release_date).getFullYear() === parseInt(selectedYear);
      return matchesSearchTerm && matchesYear;
    });

  return (
    <div className="App">
    <Header/>
      <h1>Movie Names</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by movie name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {yearsArray.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="movie-list">
        {filteredData.map((movie) => (
          <Body key={movie.movie_name} movie={movie} searchTerm={searchTerm} selectedYear={selectedYear} />
        ))}
      </div>
    </div>
  );
}

export default Home;