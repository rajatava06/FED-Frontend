import React, { useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { ChatBot } from "../../features";
// import data from '../../data/Blog.json';
import styles from '../Blog/styles/Blog.module.scss';
import LeftSidebar from '../../layouts/Blog/LeftSidebar/LeftSidebar';
import RightSidebar from '../../layouts/Blog/RightSidebar/RightSidebar';
import {api} from '../../services'; // Assuming you have an API module to fetch data

const Blog = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [sortOrder, setSortOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.blogs
    .filter((blog) => {
      // Parse author field safely
      let authorObj;
      try {
        authorObj = JSON.parse(blog.author);
      } catch (err) {
        authorObj = { department: null, name: '' };
      }

      return selectedDepartment
        ? authorObj.department === selectedDepartment
        : true;
    })
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((blog) => {
      // Parse approval field safely
      let approvalObj;
      try {
        approvalObj = JSON.parse(blog.approval);
      } catch (err) {
        approvalObj = { status: false };
      }

      return approvalObj.status === true;
    });

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'latest' ? dateB - dateA : dateA - dateB;
  });

  // useEffect(() => {
  //   // Fetch data or perform any side effects here
  //   api.get('/api/blog/getBlog')
  // }, []);

  return (
    <div className={styles.feed}>
      <LeftSidebar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className={styles.displayFeed}>
        {sortedData.length > 0 ? (
          sortedData.map((blog) => <BlogCard key={blog.id} data={blog} />)
        ) : (
          <p>No blogs match your search criteria.</p>
        )}
      </div>
      <RightSidebar blogs={sortedData} />
      <ChatBot />
    </div>
  );
};

export default Blog;
