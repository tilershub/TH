import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'
import SearchBar from './components/SearchBar'
import Card from './components/Card'
import BlogCard from './components/BlogCard'
import './App.css'

function App(){
  return (
    <>
      <Header />
      <main className="container">
        <Banner />
        <SearchBar />
        <section>
          <div className="row-head"><h2>Featured Tilers</h2><a href="#">See all</a></div>
          <div className="cards-grid">
            <Card title="Tiler 1" details="Colombo, 5⭐"/>
            <Card title="Tiler 2" details="Kandy, 4.5⭐"/>
            <Card title="Tiler 3" details="Galle, 4.7⭐"/>
          </div>
        </section>
        <section>
          <div className="row-head"><h2>From Blog</h2><a href="#">See all</a></div>
          <BlogCard title="How to choose tiles" intro="Some intro..."/>
        </section>
        <section>
          <div className="row-head"><h2>More Tilers</h2></div>
          <div className="cards-grid">
            <Card title="Tiler 4" details="Details..."/>
            <Card title="Tiler 5" details="Details..."/>
            <Card title="Tiler 6" details="Details..."/>
          </div>
        </section>
        <section>
          <div className="row-head"><h2>Latest Blog</h2></div>
          <BlogCard title="Bathroom design tips" intro="Some intro..."/>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
