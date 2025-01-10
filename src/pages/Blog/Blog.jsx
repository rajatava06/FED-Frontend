import React, { useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { ChatBot } from "../../features";
import data from '../../data/Blog.json';
import styles from '../Blog/styles/Blog.module.scss';
import LeftSidebar from '../../layouts/Blog/LeftSidebar/LeftSidebar';
import RightSidebar from '../../layouts/Blog/RightSidebar/RightSidebar';

const Blog = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Filter blogs based on selected department
  const filteredData = selectedDepartment
    ? data.filter((blog) => blog.authorDepartment === selectedDepartment)
    : data;

  return (
    <div className={styles.feed}>
      {/* Left Sidebar */}
      <LeftSidebar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />

      {/* Blog Cards Display */}
      <div className={styles.displayFeed}>
        {filteredData.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>

      {/* Right Sidebar */}
      <div className={styles.rightSidebar}>
        <RightSidebar blogs={data} /> {/* Pass original blog data */}
      </div>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Blog;
