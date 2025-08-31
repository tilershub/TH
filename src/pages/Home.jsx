// src/pages/Home.jsx
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
        {/* Banner */}
        <Banner
          items={[
            {
              img: '/images/banner1.jpg',
              title: 'Professional Tiling Services',
              sub: 'Your trusted tiling partner',
              cta: 'Find Tilers',
              href: '/tilers',
            },
            {
              img: '/images/banner2.jpg',
              title: 'Certified Tilers',
              sub: 'Quality work guaranteed',
              cta: 'View Profiles',
              href: '/tilers',
            },
          ]}
        />

        {/* Search */}
        <SearchBar onSearch={(q) => console.log('Searching:', q)} />

        {/* Featured Tilers */}
        <section style={{ marginTop: '2rem' }}>
          <div className="row-head">
            <h2>Featured Tilers</h2>
            <a href="/tilers" className="link-accent">See all</a>
          </div>
          <div className="cards-grid">
            <Card />
            <Card name="Master Craft Tiling" city="Kandy" rating={4.7} />
            <Card name="Pro Tiles Galle" city="Galle" rating={4.9} />
          </div>
        </section>

        {/* Blog Section */}
        <section style={{ marginTop: '2rem' }}>
          <div className="row-head">
            <h2>From Blog</h2>
            <a href="/blog" className="link-accent">See all</a>
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