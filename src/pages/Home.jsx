import React, { useState, useEffect } from ‘react’;
import { Link } from ‘react-router-dom’;
import Header from ‘../components/Header’;

// Temporary placeholder components until you create the actual ones
const Footer = () => (

  <footer style={{ padding: '2rem', backgroundColor: '#1f2937', color: 'white', textAlign: 'center' }}>
    <p>&copy; 2025 TILERSHUB. All rights reserved.</p>
  </footer>
);

const Banner = () => (

  <section style={{ 
    padding: '4rem 1rem', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textAlign: 'center'
  }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
        Find Expert Tilers Near You
      </h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.9, margin: '0' }}>
        Connect with certified tiling professionals for your next project
      </p>
    </div>
  </section>
);

const SearchBar = () => (

  <div style={{ 
    display: 'flex', 
    maxWidth: '600px', 
    margin: '0 auto',
    gap: '1rem',
    flexWrap: 'wrap'
  }}>
    <input 
      type="text" 
      placeholder="Enter your location..."
      style={{
        flex: '1',
        minWidth: '250px',
        padding: '0.75rem',
        border: '2px solid #e5e7eb',
        borderRadius: '0.5rem',
        fontSize: '1rem'
      }}
    />
    <button style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '#2563eb',
      color: 'white',
      border: 'none',
      borderRadius: '0.5rem',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer'
    }}>
      Search Tilers
    </button>
  </div>
);

const Card = ({ name, location, rating, price, image, specialties, experience, description }) => (

  <div style={{
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  }}>
    <div style={{ height: '200px', backgroundColor: '#f3f4f6', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#6b7280',
        fontSize: '0.9rem'
      }}>
        Tiler Image
      </div>
    </div>
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
        {name}
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
        📍 {location}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ color: '#059669', fontWeight: '600' }}>⭐ {rating}</span>
        <span style={{ fontWeight: 'bold', color: '#1f2937' }}>{price}</span>
      </div>
      <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
        {description}
      </p>
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>
          Specialties:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {specialties?.map((specialty, index) => (
            <span key={index} style={{
              fontSize: '0.75rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: '#dbeafe',
              color: '#2563eb',
              borderRadius: '0.25rem'
            }}>
              {specialty}
            </span>
          ))}
        </div>
      </div>
      <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0' }}>
        Experience: {experience}
      </p>
    </div>
  </div>
);

const BlogCard = ({ title, excerpt, image, date, author, slug }) => (

  <article style={{
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  }}>
    <div style={{ height: '200px', backgroundColor: '#f3f4f6', position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#6b7280',
        fontSize: '0.9rem'
      }}>
        Blog Image
      </div>
    </div>
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', margin: '0 0 0.75rem 0' }}>
        <Link 
          to={`/blog/${slug}`}
          style={{ color: '#1f2937', textDecoration: 'none' }}
        >
          {title}
        </Link>
      </h3>
      <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 1rem 0' }}>
        {excerpt}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#9ca3af' }}>
        <span>By {author}</span>
        <time>{new Date(date).toLocaleDateString()}</time>
      </div>
    </div>
  </article>
);

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
setTilers([]);
} finally {
setLoading(false);
}
};

```
loadTilers();
```

}, []);

// Fallback tilers data
const fallbackTilers = [
{
id: ‘fallback-1’,
name: ‘Professional Tiler Services’,
location: ‘Your Local Area’,
rating: 4.8,
price: ‘$50/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Bathroom Tiling’, ‘Kitchen Backsplash’],
experience: ‘5+ years’,
description: ‘Expert bathroom and kitchen tiling services’
},
{
id: ‘fallback-2’,
name: ‘Expert Tiling Solutions’,
location: ‘Metropolitan Area’,
rating: 4.9,
price: ‘$45/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Floor Tiling’, ‘Wall Tiling’],
experience: ‘10+ years’,
description: ‘Comprehensive floor and wall tiling expertise’
},
{
id: ‘fallback-3’,
name: ‘Quality Tile Installation’,
location: ‘City Center’,
rating: 4.7,
price: ‘$55/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Commercial Tiling’, ‘Residential’],
experience: ‘8+ years’,
description: ‘Commercial and residential tiling specialists’
},
{
id: ‘fallback-4’,
name: ‘Reliable Tiling Co.’,
location: ‘Suburban Area’,
rating: 4.6,
price: ‘$48/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Renovation’, ‘Repair Work’],
experience: ‘6+ years’,
description: ‘Renovation and repair tiling services’
},
{
id: ‘fallback-5’,
name: ‘Master Tile Craftsmen’,
location: ‘Downtown District’,
rating: 4.8,
price: ‘$60/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Luxury Tiling’, ‘Custom Design’],
experience: ‘12+ years’,
description: ‘Luxury and custom tile design specialists’
},
{
id: ‘fallback-6’,
name: ‘Quick Tile Solutions’,
location: ‘Express Service Area’,
rating: 4.5,
price: ‘$40/hr’,
image: ‘/images/placeholder-tiler.jpg’,
specialties: [‘Emergency Repairs’, ‘Quick Installation’],
experience: ‘4+ years’,
description: ‘Fast and reliable tile repair services’
}
];

// Get featured tilers (first 3) with fallbacks
const getFeaturedTilers = () => {
const available = tilers.length > 0 ? tilers : fallbackTilers;
return available.slice(0, 3);
};

// Get more tilers (next 3) with fallbacks
const getMoreTilers = () => {
const available = tilers.length > 0 ? tilers : fallbackTilers;
return available.slice(3, 6);
};

// Sample blog posts for BlogCard
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
<p>Loading TILERSHUB…</p>
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
    <section style={{ 
      padding: '2rem 1rem', 
      backgroundColor: '#f9fafb',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SearchBar />
      </div>
    </section>

    {/* Featured Tilers Section */}
    <section style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Featured Tilers
          </h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: '0'
          }}>
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
              description={tiler.description || 'Professional tiling services'}
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
              transition: 'all 0.3s ease'
            }}
          >
            View All Tilers
          </Link>
        </div>
      </div>
    </section>

    {/* More Tilers Section */}
    <section style={{ 
      padding: '3rem 1rem', 
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            More Quality Tilers
          </h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: '0'
          }}>
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
              description={tiler.description || 'Certified tiling services'}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Blog Section */}
    <section style={{ padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Latest From Our Blog
          </h2>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '1.1rem',
            margin: '0'
          }}>
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
              transition: 'all 0.3s ease'
            }}
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
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          margin: '0 0 1rem 0'
        }}>
          Ready to Start Your Tiling Project?
        </h2>
        <p style={{ 
          fontSize: '1.2rem', 
          marginBottom: '2rem', 
          opacity: 0.9,
          margin: '0 0 2rem 0'
        }}>
          Connect with certified tilers in your area and get your project done right
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap' 
        }}>
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
              transition: 'all 0.3s ease'
            }}
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