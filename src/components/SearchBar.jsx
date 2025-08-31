import React, { useState } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ placeholder='Search tilers, blogs...', onSearch }){
  const [q,setQ] = useState('')
  const submit = (e)=>{
    e.preventDefault()
    onSearch && onSearch(q.trim())
  }
  return (
    <form className={styles.wrap} role="search" onSubmit={submit}>
      <input
        className={styles.input}
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
      <button className={styles.btn} type="submit">Search</button>
    </form>
  )
}
