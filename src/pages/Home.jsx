import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import BlogCard from '../components/BlogCard';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container">
        <Banner />
        <SearchBar />

        <div className="row-head"><h2>Featured Tilers</h2><a href="#" className="link-accent">See all</a></div>
        <div className="cards-grid">
          <Card title="Tiler 1">Details...</Card>
          <Card title="Tiler 2">Details...</Card>
          <Card title="Tiler 3">Details...</Card>
        </div>

        <div className="row-head"><h2>From Blog</h2><a href="#" className="link-accent">See all</a></div>
        <div className="cards-grid">
          <BlogCard title="How to choose tiles" excerpt="Some intro..." />
        </div>

        <div className="row-head"><h2>More Tilers</h2></div>
        <div className="cards-grid">
          <Card title="Tiler 4">Details...</Card>
          <Card title="Tiler 5">Details...</Card>
          <Card title="Tiler 6">Details...</Card>
        </div>

        <div className="row-head"><h2>Latest Blog</h2></div>
        <div className="cards-grid">
          <BlogCard title="Bathroom design tips" excerpt="Some intro..." />
        </div>
      </main>
      <Footer />
    </>
  )
}
