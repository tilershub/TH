import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [tilers, setTilers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure the file is at public/data/tilers.json
    fetch('/data/tilers.json')
      .then((r) => r.json())
      .then((data) => setTilers(Array.isArray(data) ? data : []))
      .catch((e) => {
        console.error('Failed to load tilers.json', e);
        setTilers([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const placeholders = [
    { id: 'ph-1', name: 'Loading…', city: '', rating: 0 },
    { id: 'ph-2', name: 'Loading…', city: '', rating: 0 },
    { id: 'ph-3', name: 'Loading…', city: '', rating: 0 },
  ];

  const top = tilers.slice(0, 3);
  const more = tilers.slice(3, 6);

  const topList = loading
    ? placeholders
    : (top.length ? top : placeholders);

  const moreList = loading
    ? placeholders
    : (more.length ? more : placeholders);

  return (
    <>
      <Header />

      <main className="container">
        <Banner />

        <div style={{ marginTop: 12 }}>
          <SearchBar onSearch={(q) => console.log('search:', q)} />
        </div>

        <section style={{ marginTop: 24 }}>
          <div className="row-head">
            <h2>Featured Tilers</h2>
            <Link className="link-accent" to="/tilers">See all</Link>
          </div>
          <div className="cards-grid">
            {topList.map((t, i) => (
              <Card key={t.id || `top-${i}`} {...t} />
            ))}
          </div>
        </section>

        <section style={{ marginTop: 12 }}>
          <div className="row-head">
            <h2>From Blog</h2>
            <Link className="link-accent" to="/blog">See all</Link>
          </div>
          <div className="cards-grid">
            <BlogCard />
          </div>
        </section>

        <section style={{ marginTop: 24 }}>
          <div className="row-head">
            <h2>More Pros</h2>
            <Link className="link-accent" to="/tilers">Browse</Link>
          </div>
          <div className="cards-grid">
            {moreList.map((t, i) => (
              <Card key={t.id || `more-${i}`} {...t} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}