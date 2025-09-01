import React, { useState, useEffect } from ‘react’;
import { Link } from ‘react-router-dom’;
import Header from ‘../components/Header’;
import Footer from ‘../components/Footer’;
import Banner from ‘../components/Banner’;
import SearchBar from ‘../components/SearchBar’;
import Card from ‘../components/Card’;
import BlogCard from ‘../components/BlogCard’;

const Home = () => {
const [tilers, setTilers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Load tilers data from public/data/tilers.json
useEffect(() => {
const loadTilers = async () => {
try {
const response = await fetch(’/data/tilers.json’);
if (!response.ok) {
throw new Error(‘Failed to load tilers data’);
}
const data = await response.json();
setTilers(Array.isArray(data) ? data : []);
} catch (err) {
console.error(‘Error loading tilers:’, err);
setError(err.message);
// Set fallback data if fetch fails
setTilers([]);
} finally {
setLoading(false);
}
};

```
loadTilers();
```

}, []);

// Get featured tilers (first 3) with fallbacks
const getFeaturedTilers = () => {
const featured = tilers.slice(0, 3);
const fallbacks = [
{
id: ‘fallback-1’,
name: ‘Professional Tiler’,
location: ‘Your Area’,
rating: 4.8,
price: ‘$50/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Bathroom’, ‘Kitchen’],
experience: ‘5+ years’
},
{
id: ‘fallback-2’,
name: ‘Expert Tiling Co.’,
location: ‘Local Service’,
rating: 4.9,
price: ‘$45/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Floor’, ‘Wall’],
experience: ‘10+ years’
},
{
id: ‘fallback-3’,
name: ‘Quality Tiles Ltd’,
location: ‘Nearby’,
rating: 4.7,
price: ‘$55/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Commercial’, ‘Residential’],
experience: ‘8+ years’
}
];

```
// Fill with fallbacks if we don't have enough real data
while (featured.length < 3) {
  const fallback = fallbacks[featured.length];
  if (fallback) {
    featured.push(fallback);
  } else {
    break;
  }
}

return featured;
```

};

// Get additional tilers (next 3) with fallbacks
const getMoreTilers = () => {
const moreTilers = tilers.slice(3, 6);
const fallbacks = [
{
id: ‘fallback-4’,
name: ‘Reliable Tiling’,
location: ‘Service Area’,
rating: 4.6,
price: ‘$48/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Renovation’, ‘Repair’],
experience: ‘6+ years’
},
{
id: ‘fallback-5’,
name: ‘Master Tilers’,
location: ‘Local’,
rating: 4.8,
price: ‘$60/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Luxury’, ‘Custom’],
experience: ‘12+ years’
},
{
id: ‘fallback-6’,
name: ‘Quick Tile Fix’,
location: ‘Express Service’,
rating: 4.5,
price: ‘$40/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Emergency’, ‘Quick Fix’],
experience: ‘4+ years’
}
];

```
// Fill with fallbacks if we don't have enough real data
while (moreTilers.length < 3) {
  const fallback = fallbacks[moreTilers.length];
  if (fallback) {
    moreTilers.push(fallback);
  } else {
    break;
  }
}

return moreTilers;
```

};

// Sample blog posts
const blogPosts = [
{
id: 1,
title: “Top 5 Bathroom Tiling Trends for 2025”,
excerpt: “Discover the latest trends in bathroom tiling that will transform your space into a modern sanctuary.”,
image: “/images/blog-bathroom-trends.jpg”,
date: “2025-08-15”,
author: “Sarah Johnson”,
slug: “bathroom-tiling-trends-2025”
},
{
id: 2,
title: “How to Choose the Right Grout Color”,
excerpt: “Learn the art of selecting grout colors that complement your tiles and enhance your overall design.”,
image: “/images/blog-grout-color.jpg”,
date: “2025-08-10”,
author: “Mike Thompson”,
slug: “choosing-right-grout-color”
},
{
id: 3,
title: “DIY vs Professional Tiling: When to Call the Experts”,
excerpt: “Understanding when you can tackle tiling yourself and when it’s worth investing in professional help.”,
image: “/images/blog-diy-vs-pro.jpg”,
date: “2025-08-05”,
author: “Emma Wilson”,
slug: “diy-vs-professional-tiling”
}
];

const featuredTilers = getFeaturedTilers();
const moreTilers = getMoreTilers();

if (loading) {
return (
<div>
<Header />
<main style={{ padding: ‘2rem’, textAlign: ‘center’ }}>
<p>Loading…</p>
</main>
<Footer />
</div>
);
}

return (
<div>
<Header />

```
  <main>
    {/* Hero Banner Section */}
    <Banner />

    {/* Search Bar Section */}
    <section style={{ padding: '2rem 1rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar />
      </div>
    </section>

    {/* Featured Tilers Section */}
    <section style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Featured Tilers
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Discover top-rated tiling professionals in your area
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {featuredTilers.map((tiler) => (
            <Card
              key={tiler.id}
              name={tiler.name || 'Professional Tiler'}
              location={tiler.location || 'Local Area'}
              rating={tiler.rating || 4.5}
              price={tiler.price || '$50/hr'}
              image={tiler.image || '/images/placeholder-tiler.jpg'}
              specialties={tiler.specialties || ['General Tiling']}
              experience={tiler.experience || '5+ years'}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link 
            to="/find-tiler"
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            View All Tilers
          </Link>
        </div>
      </div>
    </section>

    {/* More Tilers Section */}
    <section style={{ padding: '3rem 1rem', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            More Quality Tilers
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Explore additional certified tiling professionals
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {moreTilers.map((tiler) => (
            <Card
              key={tiler.id}
              name={tiler.name || 'Certified Tiler'}
              location={tiler.location || 'Service Area'}
              rating={tiler.rating || 4.5}
              price={tiler.price || '$50/hr'}
              image={tiler.image || '/images/placeholder-tiler.jpg'}
              specialties={tiler.specialties || ['Professional Tiling']}
              experience={tiler.experience || '5+ years'}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Blog Section */}
    <section style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            Latest From Our Blog
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Expert tips, trends, and insights for your tiling projects
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              date={post.date}
              author={post.author}
              slug={post.slug}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link 
            to="/blog"
            style={{
              display: 'inline-block',
              backgroundColor: '#059669',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
          >
            Read More Articles
          </Link>
        </div>
      </div>
    </section>

    {/* Call to Action Section */}
    <section style={{ 
      padding: '4rem 1rem', 
      backgroundColor: '#2563eb',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Ready to Start Your Tiling Project?
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
          Connect with certified tilers in your area and get your project done right
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/find-tiler"
            style={{
              display: 'inline-block',
              backgroundColor: 'white',
              color: '#2563eb',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Find a Tiler
          </Link>
          <Link 
            to="/estimator"
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '600',
              border: '2px solid white',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            Get Estimate
          </Link>
        </div>
      </div>
    </section>
  </main>

  <Footer />
</div>
```

);
};

export default Home;