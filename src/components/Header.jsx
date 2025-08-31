import React from 'react'
export default function Header(){
  return (
    <header>
      <nav style={{display:'flex',gap:'20px',alignItems:'center'}}>
        <h1 style={{color:'var(--primary)',marginRight:'auto'}}>TILERSHUB</h1>
        <a href="#">Home</a>
        <a href="#">Blog</a>
        <a href="#">Estimator</a>
      </nav>
    </header>
  )
}