import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import SearchBar from '../components/SearchBar'
import Card from '../components/Card'
import BlogCard from '../components/BlogCard'

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        {/* If Banner ever fails, comment it out and the page still renders */}
        <Banner />

        <div style={{ marginTop: 16 }}>
          <SearchBar onSearch={(q) => console.log('search:', q)} />
        </div>

        <section style={{ marginTop: 24 }}>
          <div className="row-head">
            <h2>Featured Tilers</h2>
            <a className="link-accent" href="/tilers">See all</a>
          </div>
          <div className="cards-grid">
            <Card />
            <Card name="Master Craft Tiling" city="Kandy" rating={4.7} />
            <Card name="Pro Tiles Galle" city="Galle" rating={4.9} />
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <div className="row-head">
            <h2>From Blog</h2>
            <a className="link-accent" href="/blog">See all</a>
          </div>
          <div className="cards-grid">
            <BlogCard
              title="How to choose tiles"
              excerpt="Tips on selecting the right material and size…"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}