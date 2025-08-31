import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
import Card from '../components/Card'
import BlogCard from '../components/BlogCard'

export default function Home(){
  const [tilers,setTilers] = useState([])

  useEffect(()=>{
    fetch('/data/tilers.json').then(r=>r.json()).then(setTilers).catch(()=>setTilers([]))
  }, [])

  return (
    <>
      <Header />

      <main className="container">
        <Banner />

        <div style={{marginTop:12}}>
          <SearchBar onSearch={(q)=>console.log('search:', q)} />
        </div>

        <section style={{marginTop:24}}>
          <div className="row-head">
            <h2>Featured Tilers</h2>
            <a className="link-accent" href="/tilers">See all</a>
          </div>
          <div className="cards-grid">
            {(tilers.slice(0,3).length ? tilers.slice(0,3) : [1,2,3]).map((t,i)=> (
              <Card key={t.id || i} {...t} />
            ))}
          </div>
        </section>

        <section style={{marginTop:12}}>
          <div className="row-head">
            <h2>From Blog</h2>
            <a className="link-accent" href="/blog">See all</a>
          </div>
          <div className="cards-grid">
            <BlogCard />
          </div>
        </section>

        <section style={{marginTop:24}}>
          <div className="row-head">
            <h2>More Pros</h2>
            <a className="link-accent" href="/tilers">Browse</a>
          </div>
          <div className="cards-grid">
            {(tilers.slice(3,6).length ? tilers.slice(3,6) : [1,2,3]).map((t,i)=> (
              <Card key={t.id || 'm'+i} {...t} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
