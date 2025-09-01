// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [tilers, setTilers] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/data/tilers.json')
      .then((r) => r.json())
      .then((data) => setTilers(Array.isArray(data) ? data : data?.tilers ?? []))
      .catch(() => setTilers([]));
  }, []);

  const filtered = query
    ? tilers.filter((t) =>
        [t.name, t.city, t.location, t.bio]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : tilers;

  return (
    <>
      <Header />

      <main className="container" style={{ paddingBottom: 32 }}>
        <Banner />

        <div style={{ marginTop: 12 }}>
          <SearchBar onSearch={(q) => setQuery(q)} />
        </div>

        <section style={{ marginTop: 24 }}>
          <div className="row-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Featured Tilers</h2>
            <a className="link-accent" href="/tilers">See all</a>
          </div>

          <div className="grid" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', marginTop: 12 }}>
            {filtered.slice(0, 8).map((t) => (
              <Card key={t.id || t.name} {...t} />
            ))}
            {filtered.length === 0 && (
              <p style={{ opacity: 0.7, gridColumn: '1/-1' }}>No tilers match your search.</p>
            )}
          </div>
        </section>

        <section style={{ marginTop: 32 }}>
          <div className="row-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }}>Latest from the Blog</h2>
            <a className="link-accent" href="/blog">See all</a>
          </div>

          <div className="grid" style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', marginTop: 12 }}>
            {/* If you have /data/blogs.json, map it here. Placeholder cards for now. */}
            <BlogCard title="How to choose tile size" href="/blog/how-to-choose-tile-size" />
            <BlogCard title="Bathroom waterproofing basics" href="/blog/bathroom-waterproofing-basics" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}