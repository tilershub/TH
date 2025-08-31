import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'

export default function Blog(){
  const [blogs, setBlogs] = useState([])
  useEffect(()=>{
    fetch('/data/blogs.json').then(r=>r.json()).then(setBlogs).catch(()=>setBlogs([]))
  },[])
  return (
    <>
      <Header />
      <main className="container" style={{paddingTop:16}}>
        <div className="row-head"><h2>Blog</h2></div>
        <div className="cards-grid">
          {blogs.length ? blogs.map(b => (
            <BlogCard key={b.id} title={b.title} meta={b.meta} excerpt={b.excerpt} />
          )) : <BlogCard />}
        </div>
      </main>
      <Footer />
    </>
  )
}
