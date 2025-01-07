/* eslint-disable no-unused-vars */
import React from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import { ChatBot, LiveEventPopup } from "../../features";
import data from '../../data/Blog.json'
import styles from '../Blog/styles/Blog.module.scss'

const Blog = () => {

  window.scrollTo(0, 0);

  return (
    <>
   <div className={styles.displayFeed}>
      {data.map((blog, index) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </div>
    <ChatBot />
    </>
  );
};

export default Blog;
