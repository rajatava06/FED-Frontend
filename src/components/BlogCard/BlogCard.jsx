/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './styles/BlogCard.module.scss';

function BlogCard(props) {
  const { data } = props;
  const { blogHeading, blogImage, dateOfPosting, publicReaction } = data;

  return (
    <div className={styles.card}>
      <div className={styles.imageSection}>
        <img src={blogImage || "https://via.placeholder.com/100"} alt={blogHeading} />
      </div>

      <div className={styles.contentSection}>
        <h1 className={styles.heading}>{blogHeading}</h1>
        <p className={styles.startLine}>
          Machine learning is the science of getting computers to act without being explicitly programmed.
        </p>
        <div className={styles.interaction}>
          <p className={styles.date}>{dateOfPosting}</p>
          <div className={styles.reactions}>
            <span className={styles.icon}>
              <i className="fas fa-thumbs-up"></i> {publicReaction.likes}
            </span>
            <span className={styles.icon}>
              <i className="fas fa-comment-alt"></i> {publicReaction.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
