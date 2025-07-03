import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import styles from "./styles/FullBlog.module.scss";
import BlogCard from "../../components/BlogCard/BlogCard";
import { ChatBot } from "../../features";
import { api } from "../../services";
import { ComponentLoading } from "../../microInteraction";

const FullBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showAllBlogs, setShowAllBlogs] = useState(false);


const [departments, setDepartments] = useState(["All"]);


  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/blog/getBlog');
      if (response.status === 200) {
        const blogData = response.data.blogs || [];
        let processedBlogs = [];

        if (typeof blogData === 'string') {
          try {
            processedBlogs = JSON.parse(blogData);
          } catch {
            processedBlogs = [];
          }
        } else if (Array.isArray(blogData)) {
          processedBlogs = blogData.map((blog) => ({
            id: blog.id || blog._id,
            title: blog.title || blog.blogTitle || 'Untitled Blog',
            desc: blog.desc || blog.metaDescription || blog.blogContent || '',
            image: blog.image || blog.blogImage || 'https://via.placeholder.com/400x200',
            date: blog.date || blog.blogDate || new Date().toISOString(),
            author: blog.author || blog.blogAuthor || '{"name":"Unknown","department":"N/A"}',
            blogLink: blog.blogLink || blog.mediumLink || '',
            visibility: blog.visibility === 'private' ? 'private' : 'public',
            approval: blog.approval === false ? false : true,
            summary: blog.summary || blog.metaDescription || '',
            likes: blog.likes || 0,
            comments: blog.comments || [],
            readTime: blog.readTime || Math.ceil(Math.random() * 15) + 3,
          }));
        }

        setBlogs(processedBlogs);

        // ✅ Extract departments dynamically
        const uniqueDepts = new Set();
        processedBlogs.forEach((blog) => {
          try {
            const authorObj = typeof blog.author === 'string' ? JSON.parse(blog.author) : blog.author;
            if (authorObj.department) uniqueDepts.add(authorObj.department);
          } catch {}
        });
        setDepartments(["All", ...Array.from(uniqueDepts)]);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch {
      setError('An error occurred while fetching blogs');
    } finally {
      setIsLoading(false);
    }
  };

  fetchBlogs();
}, []);



  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <ComponentLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.searchWrapper}>
  <div className={styles.searchBar}>
    <Search size={18} className={styles.searchIcon} />
    <input
      type="text"
      placeholder="Search Blogs"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={styles.searchInput}
    />
    <div className={styles.filterWrapper}>
      <button onClick={() => setShowFilter(!showFilter)} className={styles.filterButton}>
        <Filter size={18} />
      </button>
      {showFilter && (
        <ul className={styles.dropdown}>
          {departments.map((dept, i) => (
            <li
              key={i}
              className={`${styles.dropdownItem} ${
                selectedDepartment === dept ? styles.activeItem : ""
              }`}
              onClick={() => {
                setSelectedDepartment(dept);
                setShowFilter(false);
              }}
            >
              {dept}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</div>


        {/* Blog Sections */}
        <div className={styles.blogSections}>
          {/* Recently Added & Trending */}
          <div className={styles.topSection}>
            {/* Recently Added */}
            <section className={styles.recentlyAdded}>
              <h3>RECENTLY ADDED</h3>
              {filteredBlogs.length > 0 ? (
                <BlogCard
                  blog={filteredBlogs[0]}
                  large
                  onClick={() => navigate(`/blog/${filteredBlogs[0].id}`)}
                />
              ) : (
                <p>No recent blogs available.</p>
              )}
            </section>

            {/* Trending Blogs */}
            <section className={styles.trendingBlogs}>
              <h3>TRENDING BLOGS</h3>
              <div className={styles.trendingGrid}>
                {filteredBlogs.slice(1, 3).map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Featured This Week */}
          <section className={styles.featuredBlogs}>
            <h3>FEATURED THIS WEEK</h3>
            <div className={styles.featuredGrid}>
              {filteredBlogs.slice(3, 6).map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* See All Blogs Button */}
     <div className={styles.buttonWrapper}>
  <button
    className={styles.seeAllButton}
    onClick={() => setShowAllBlogs(true)}
  >
    See All Blogs
  </button>
</div>

      </div>

      <ChatBot />
    </div>
  );
};

export default FullBlog;
