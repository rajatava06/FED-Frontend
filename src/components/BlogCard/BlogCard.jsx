import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/BlogCard.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard(props) {
  const { data } = props;
  const { id, blogHeading, blogContent, blogImage, dateOfPosting, publicReaction } = data;

<<<<<<< Updated upstream
  // Function to strip HTML tags
=======
>>>>>>> Stashed changes
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

<<<<<<< Updated upstream
  // Function to truncate text with ellipsis
=======
>>>>>>> Stashed changes
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

<<<<<<< Updated upstream
  // Strip HTML tags and truncate content
=======
>>>>>>> Stashed changes
  const plainTextContent = stripHtmlTags(blogContent);
  const truncatedContent = truncateText(plainTextContent, 150);

  return (
    <div className={styles.card}>
      <Link to={`/Blog/${id}`} className={styles.link}>
        <div className={styles.imageSection}>
          <img src={blogImage || "https://via.placeholder.com/100"} alt={blogHeading} />
        </div>
        <div className={styles.contentSection}>
          <h1 className={styles.heading}>{blogHeading}</h1>
          <p className={styles.startLine}>
            {truncatedContent}
          </p>
          <div className={styles.interaction}>
            <p className={styles.date}>{new Date(dateOfPosting).toDateString()}</p>
            <div className={styles.reactions}>
              <span className={styles.icon}>
                <FaRegHeart /> {publicReaction.likes}
              </span>
              <span className={styles.icon}>
                <FaCommentAlt /> {publicReaction.comments.length}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
