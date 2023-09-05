import React from 'react'
import '../../style.css'
import { useNavigate } from 'react-router-dom'


function Header() {
  const navigate=useNavigate()
  const handlebutton = async (e) => {
    navigate('/history')
  }

  return (
    <div>
    <header>
    <a href="/" class="logo"><i class="fas fa-utensils"></i>BOOK-YOUR-SHOW</a>

    <nav class="navbar">
        <a href='/'>Home</a>
        <button onClick={handlebutton}>History</button>
        
    </nav>
    </header>
    </div>
  )
}

export default Header
