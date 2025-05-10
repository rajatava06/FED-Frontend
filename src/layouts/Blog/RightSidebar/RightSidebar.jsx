import React from "react";
import styles from "./styles/RightSidebar.module.scss";
import { Link } from "react-router-dom";

const RightSidebar = ({ blogs }) => {
  // blogs sorting with safety checks
  const sortedBlogs = blogs
    .map((blog) => {
      const likes = blog.publicReaction?.likes || 0;
      const commentsCount = blog.publicReaction?.comments?.length || 0;
      return {
        ...blog,
        totalReactions: likes + commentsCount,
      };
    })
    .sort((a, b) => b.totalReactions - a.totalReactions)
    .slice(0, 8);

  return (
    <div className={styles.rightSidebar}>
      <div className={styles.sidebarHeader}>
        <h3>Top Blogs</h3>
      </div>
      <ul className={styles.blogList}>
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className={styles.blogItem}>
            <Link to={`/Blog/${blog.id}`} className={styles.blogLink}>
              <div className={styles.blogInfo}>
                <h4 className={styles.blogHeading}>{blog.blogHeading}</h4>
                <p className={styles.blogAuthor}>{`By ${blog.authorName}`}</p>
                <p className={styles.blogReactions}>
                  {blog.publicReaction?.likes || 0} Likes • {blog.publicReaction?.comments?.length || 0} Comments
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
