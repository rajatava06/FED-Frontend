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

<<<<<<< Updated upstream
  // Filter blogs by department and search query in the heading
  const filteredData = data
    .filter((blog) => 
      selectedDepartment ? blog.authorDepartment === selectedDepartment : true
    )
    .filter((blog) => 
      blog.blogHeading.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => 
      blog.status === 'Approved'
    );


  // Sort blogs by date (latest or oldest)
=======
  // filter blogs by department
  const filteredData = data
    .filter((blog) =>
      selectedDepartment ? blog.authorDepartment === selectedDepartment : true
    )
    .filter((blog) =>
      blog.blogHeading.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) =>
      blog.status === 'Approved'
    );

  // sort blogs by date
>>>>>>> Stashed changes
  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.dateOfPosting);
    const dateB = new Date(b.dateOfPosting);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className={styles.feed}>
<<<<<<< Updated upstream
      {/* Left Sidebar for department filter, search, and sort */}
=======
>>>>>>> Stashed changes
      <LeftSidebar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

<<<<<<< Updated upstream
      {/* Main Content Area */}
=======
>>>>>>> Stashed changes
      <div className={styles.displayFeed}>
        {sortedData.length > 0 ? (
          sortedData.map((blog) => <BlogCard key={blog.id} data={blog} />)
        ) : (
          <p>No blogs match your search criteria.</p>
        )}
      </div>

<<<<<<< Updated upstream
      {/* Right Sidebar */}
=======
>>>>>>> Stashed changes
      <div className={styles.rightSidebar}>
        <RightSidebar blogs={sortedData} />
      </div>

<<<<<<< Updated upstream
      {/* ChatBot Component */}
=======
>>>>>>> Stashed changes
      <ChatBot />
    </div>
  );
};

<<<<<<< Updated upstream
export default Blog;
=======
export default Blog;
>>>>>>> Stashed changes
