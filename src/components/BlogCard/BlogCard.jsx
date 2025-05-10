import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/BlogCard.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';

function BlogCard(props) {
  const { data } = props;
  const { id, title, desc, image, date, author } = data;

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const truncatedContent = truncateText(desc, 150);

  let parsedAuthor;
  try {
    parsedAuthor = JSON.parse(author);
  } catch (err) {
    parsedAuthor = { name: "Unknown", department: "N/A" };
  }

  return (
    <div className={styles.card}>
      <Link to={`/Blog/${id}`} className={styles.link}>
        <div className={styles.imageSection}>
          <img src={image || "https://via.placeholder.com/100"} alt={title} />
        </div>
        <div className={styles.contentSection}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.startLine}>{truncatedContent}</p>
          <div className={styles.interaction}>
            <p className={styles.date}>{new Date(date).toDateString()}</p>
            <div className={styles.reactions}>
              <span className={styles.icon}>
                <FaRegHeart /> {/* No count available in new JSON */}
              </span>
              <span className={styles.icon}>
                <FaCommentAlt /> {/* No count available in new JSON */}
              </span>
            </div>
          </div>
          <div className={styles.author}>
            <p>By {parsedAuthor.name} ({parsedAuthor.department})</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
