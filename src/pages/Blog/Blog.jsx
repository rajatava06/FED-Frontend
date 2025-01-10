import React, { useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { ChatBot } from "../../features";
import data from '../../data/Blog.json';
import styles from '../Blog/styles/Blog.module.scss';
import LeftSidebar from '../../layouts/Blog/LeftSidebar/LeftSidebar';
import RightSidebar from '../../layouts/Blog/RightSidebar/RightSidebar';

const Blog = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter blogs by department and search query in the heading
  const filteredData = data
    .filter((blog) => 
      selectedDepartment ? blog.authorDepartment === selectedDepartment : true
    )
    .filter((blog) => 
      blog.blogHeading.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Sort blogs by date (latest or oldest)
  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.dateOfPosting);
    const dateB = new Date(b.dateOfPosting);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={styles.feed}>
      {/* Left Sidebar for department filter, search, and sort */}
      <LeftSidebar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className={styles.displayFeed}>
        {sortedData.length > 0 ? (
          sortedData.map((blog) => <BlogCard key={blog.id} data={blog} />)
        ) : (
          <p>No blogs match your search criteria.</p>
        )}
      </div>

      {/* Right Sidebar */}
      <div className={styles.rightSidebar}>
        <RightSidebar blogs={sortedData} />
      </div>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Blog;
