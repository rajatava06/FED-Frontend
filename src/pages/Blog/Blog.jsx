/* eslint-disable no-unused-vars */
// import React from 'react';
// import BlogCard from '../../components/BlogCard/BlogCard';
// import { ChatBot, LiveEventPopup } from "../../features";
// import data from '../../data/Blog.json'
// import styles from '../Blog/styles/Blog.module.scss'
// import LeftSidebar from '../../layouts/Blog/LeftSidebar/LeftSidebar';

// const Blog = () => {

//   window.scrollTo(0, 0);

//   return (
//     <div className={styles.feed}>

//     <LeftSidebar />
//    <div className={styles.displayFeed}>
//       {data.map((blog, index) => (
//         <BlogCard key={blog.id} data={blog} />
//       ))}
//     </div>
//     <ChatBot />
//     </div>
//   );
// };

// export default Blog;



import React, { useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { ChatBot, LiveEventPopup } from "../../features";
import data from '../../data/Blog.json';
import styles from '../Blog/styles/Blog.module.scss';
import LeftSidebar from '../../layouts/Blog/LeftSidebar/LeftSidebar';

const Blog = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filteredData = selectedDepartment
    ? data.filter((blog) => blog.authorDepartment === selectedDepartment)
    : data;

  return (
    <div className={styles.feed}>
      <LeftSidebar
        selectedDepartment={selectedDepartment}
        onSelectDepartment={setSelectedDepartment}
      />
      <div className={styles.displayFeed}>
        {filteredData.map((blog) => (
          <BlogCard key={blog.id} data={blog} />
        ))}
      </div>
      <ChatBot />
    </div>
  );
};

export default Blog;
