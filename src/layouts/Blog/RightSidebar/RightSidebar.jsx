import React from "react";
import styles from "./styles/RightSidebar.module.scss";
import { Link } from "react-router-dom";

const RightSidebar = ({ blogs }) => {
  // Sort blogs by total public reactions (likes + comments)
  const sortedBlogs = blogs
    .map(blog => ({
      ...blog,
      totalReactions: blog.publicReaction.likes + blog.publicReaction.comments.length,
    }))
    .sort((a, b) => b.totalReactions - a.totalReactions)
    .slice(0, 8); 

  return (
    <div className={styles.rightSidebar}>
      <h3>Top Blogs</h3>
      <ul>
        {sortedBlogs.map(blog => (
          <li key={blog.id} className={styles.blogItem}>
            <Link to={`/Blog/${blog.id}`}>
            <div className={styles.blogInfo}>
              <h4 className={styles.blogHeading}>{blog.blogHeading}</h4>
              <p className={styles.blogAuthor}>{`By ${blog.authorName}`}</p>
              <p className={styles.blogReactions}>
                {blog.publicReaction.likes} Likes • {blog.publicReaction.comments.length} Comments
              </p>
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RightSidebar;
