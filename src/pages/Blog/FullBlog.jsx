import React, { useEffect, useState } from "react";
<<<<<<< Updated upstream
import { useParams } from "react-router-dom";
import styles from "./styles/FullBlog.module.scss";
import data from "../../data/Blog.json";
import TabBar from "../../layouts/Blog/TabBar/TabBar";

const FullBlog = () => {
  const { id } = useParams();
  const [headings, setHeadings] = useState([]);
=======
import { useParams, useNavigate } from "react-router-dom";
import styles from "./styles/FullBlog.module.scss";
import data from "../../data/Blog.json";
import TabBar from "../../layouts/Blog/TabBar/TabBar";
import RightSidebar from "../../layouts/Blog/RightSidebar/RightSidebar";
import { ChatBot } from "../../features";

const FullBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [headings, setHeadings] = useState([]);

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    return <p className={styles.notFound}>Blog not found.</p>;
=======
    return (
      <div className={styles.notFoundContainer}>
        <p className={styles.notFound}>Blog not found.</p>
      </div>
    );
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
  const handleSummarize = () => {
    navigate("/blog/#");
  };

  return (
    <div className={styles.fullBlogContainer}>
      <div className={styles.contentArea}>
        <article className={styles.fullBlog}>
          <div className={styles.blogHeader}>
            <div className={styles.headerContent}>
              <figure className={styles.image}>
                <img src={blogImage} alt={blogHeading} />
              </figure>
              <div className={styles.titleWrapper}>
                <h1 className={styles.heading}>{blogHeading}</h1>
                <div
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: blogContent }}
                />
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>By {authorName}</span>
                  <span className={styles.authorDept}>{authorDepartment}</span>
                  <time className={styles.date}>
                    Posted on: {new Date(dateOfPosting).toDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
          <footer className={styles.blogFooter}>
            <div className={styles.reactions}>
              <p className={styles.likes}>
                <span className={styles.reactionIcon}>Likes:</span> {publicReaction.likes}
              </p>
              <p className={styles.comments}>
                <span className={styles.reactionIcon}>Comments:</span> {publicReaction.comments.length}
              </p>
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.summarizeButton} onClick={handleSummarize}>
                Read on Medium
              </button>
            </div>
          </footer>
        </article>
      </div>
      <ChatBot />
      <aside className={styles.sidebarArea}>
        <RightSidebar blogs={data} />
      </aside>
    </div>
>>>>>>> Stashed changes
  );
};

export default FullBlog;
