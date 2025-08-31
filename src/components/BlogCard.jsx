export default function BlogCard({ title, excerpt }) {
  return (
    <div className="blog-card">
      <h3>{title}</h3>
      <p>{excerpt}</p>
    </div>
  )
}
