import React from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/FullBlog.module.scss";
import RightSidebar from "../../layouts/Blog/RightSidebar/RightSidebar";
import data from "../../data/Blog.json";

const FullBlog = () => {
  const { id } = useParams();
  const blog = data.find((item) => item.id === parseInt(id));

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
      <div className={styles.fullPage}>
      {/* <RightSidebar blogs={data}/> */}
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
    </>
  );
};

export default FullBlog;
