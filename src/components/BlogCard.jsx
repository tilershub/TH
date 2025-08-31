import React from 'react'

export default function BlogCard({ title='How to choose tiles', meta='3 min read', excerpt='Tips on selecting the right material and size…' }){
  return (
    <article className="card">
      <h3 style={{fontWeight:800,fontSize:20,marginBottom:6}}>{title}</h3>
      <div style={{color:'#64748b',fontSize:13,marginBottom:8}}>{meta}</div>
      <p style={{color:'#334155'}}>{excerpt}</p>
    </article>
  )
}
