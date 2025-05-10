import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Acne: Causes, Types, and Effective Treatments",
      excerpt: "Acne is one of the most common skin conditions affecting people of all ages. In this comprehensive guide, we explore the root causes of acne, the different types you might experience, and evidence-based treatments that actually work.",
      content: "Full content here...",
      author: "Dr. Sarah Johnson",
      authorTitle: "Board-Certified Dermatologist",
      authorImage: "https://placehold.co/100x100/e0f2fe/333333.png?text=Dr.+S",
      date: "May 15, 2023",
      category: "Skin Conditions",
      image: "https://placehold.co/800x500/e0f2fe/333333.png?text=Acne+Treatment",
      readTime: 8
    },
    // Add other blog posts here...
  ];

  // Get unique categories
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  // Filter blog posts based on category and search term
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = category === 'all' || post.category === category;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured post (first post)
  const featuredPost = blogPosts[0];

  return (
    <div className="blog-page">
      
      <NavigationBar/>
      {/* Hero Section */}
      <section className="py-5 bg-light">
        <div className="container section-container">
          <div className="text-center fade-in">
            <h1 className="display-4 fw-bold mb-4">Skin Health Blog</h1>
            <p className="lead mb-4">Expert insights, tips, and the latest research on dermatology and skin care.</p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-5">
          <div className="container section-container">
            <div className="row">
              <div className="col-12">
                <div className="card border-0 shadow-sm overflow-hidden">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <img src={featuredPost.image} className="img-fluid" alt={featuredPost.title} style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="col-lg-6">
                      <div className="card-body p-4 p-lg-5">
                        <div className="d-flex align-items-center mb-3">
                          <span className="badge bg-primary">{featuredPost.category}</span>
                          <span className="ms-3 text-muted small"><i className="bi bi-clock me-1"></i> {featuredPost.readTime} min read</span>
                        </div>
                        <h2 className="card-title mb-3">{featuredPost.title}</h2>
                        <p className="card-text">{featuredPost.excerpt}</p>
                        <div className="d-flex align-items-center mb-4">
                          <img src={featuredPost.authorImage} className="rounded-circle me-3" width="40" height="40" alt={featuredPost.author} />
                          <div>
                            <h6 className="mb-0">{featuredPost.author}</h6>
                            <small className="text-muted">{featuredPost.date}</small>
                          </div>
                        </div>
                        <button className="btn btn-primary">Read Full Article</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-3">
        <div className="container section-container">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search articles..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search articles"
                />
              </div>
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Filter by category"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-5">
        <div className="container section-container">
          <div className="row g-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="col-lg-4 col-md-6">
                  <div className="card h-100 border-0 shadow-sm hover-scale">
                    <img src={post.image} className="card-img-top" alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <span className="badge bg-primary">{post.category}</span>
                        <span className="ms-3 text-muted small"><i className="bi bi-clock me-1"></i> {post.readTime} min read</span>
                      </div>
                      <h4 className="card-title mb-3">{post.title}</h4>
                      <p className="card-text">{post.excerpt.substring(0, 120)}...</p>
                    </div>
                    <div className="card-footer bg-white border-0 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <img src={post.authorImage} className="rounded-circle me-2" width="30" height="30" alt={post.author} />
                        <small className="text-muted">{post.date}</small>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">Read More</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <i className="bi bi-journal-x fs-1 text-muted mb-3"></i>
                <h3>No articles found</h3>
                <p className="text-muted">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-light">
        <div className="container section-container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mb-3">Stay Up to Date</h2>
              <p className="lead mb-4">Subscribe to our newsletter for the latest articles, tips, and research on skin health.</p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="input-group mb-3">
                    <input type="email" className="form-control" placeholder="Your email address" aria-label="Your email address" />
                    <button className="btn btn-primary" type="button">Subscribe</button>
                  </div>
                  <small className="text-muted">We respect your privacy and will never share your information.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Blog;