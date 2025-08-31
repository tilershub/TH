import React from 'react'
export default function BlogCard({title,intro}){
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <p>{intro}</p>
    </div>
  )
}