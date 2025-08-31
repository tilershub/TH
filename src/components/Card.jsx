import React from 'react'
export default function Card({title,details}){
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  )
}