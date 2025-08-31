import React, { useState } from 'react'

export default function SearchBar({ placeholder='Search tilers, blogs…', onSearch }){
  const [q,setQ] = useState('')
  const submit = (e)=>{ e.preventDefault(); onSearch && onSearch(q.trim()) }
  return (
    <form className="searchbar" role="search" onSubmit={submit}>
      <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder={placeholder} aria-label="Search"/>
      <button type="submit">Search</button>
    </form>
  )
}
