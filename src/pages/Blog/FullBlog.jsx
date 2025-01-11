import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/FullBlog.module.scss";
import data from "../../data/Blog.json";
import TabBar from "../../layouts/Blog/TabBar/TabBar";

const FullBlog = () => {
  const { id } = useParams();
  const [headings, setHeadings] = useState([]);
  const blog = data.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (blog) {
      const parser = new DOMParser();
      const content = parser.parseFromString(blog.blogContent, "text/html");
      const h2Tags = Array.from(content.querySelectorAll("h2")).map((tag, index) => ({
        id: tag.id || `heading-${index + 1}`,
        text: tag.textContent || `Heading ${index + 1}`,
      }));
      setHeadings(h2Tags);
    }
  }, [blog]);

  if (!blog) {
    return <p className={styles.notFound}>Blog not found.</p>;
  }

  const {
    blogHeading,
    blogContent,
    blogImage,
    authorName,
    authorDepartment,
    dateOfPosting,
    publicReaction,
  } = blog;

  return (
    <>
    <div className={styles.fullBlogContainer}>
    
    <div className={styles.fullPage}>
      
      <div className={styles.fullBlog}>
        <h1 className={styles.heading}>{blogHeading}</h1>
        <div className={styles.meta}>
          <p className={styles.author}>
            By {authorName} ({authorDepartment})
          </p>
          <p className={styles.date}>
            Posted on: {new Date(dateOfPosting).toDateString()}
          </p>
        </div>
        <div className={styles.image}>
          <img src={blogImage} alt={blogHeading} />
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blogContent }}
        ></div>
        <div className={styles.reactions}>
          <p>Likes: {publicReaction.likes}</p>
          <p>Comments: {publicReaction.comments.length}</p>
        </div>
      </div>
    </div>
    <TabBar headings={headings} />
    </div>
    </>
  );
};

export default FullBlog;
