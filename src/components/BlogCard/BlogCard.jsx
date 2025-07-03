import React from 'react';
import styles from './styles/BlogCard.module.scss';

function BlogCard(props) {
  const { data, customButtons, expandDescription = false } = props;

  let processedData = data;

  if (typeof data === 'string') {
    try {
      processedData = JSON.parse(data);
    } catch (err) {
      console.error('Error parsing blog data in card:', err, 'Raw data:', data);
      processedData = {};
    }
  } else if (!data) {
    processedData = {};
  }

  const truncateText = (text, limit) => {
    if (!text) return '';
    const textWithoutTags = text.replace(/<[^>]*>/g, '');
    return textWithoutTags.length > limit ? textWithoutTags.substring(0, limit) + "..." : textWithoutTags;
  };

  const id = processedData.id || processedData._id;
  const title = processedData.title || processedData.blogTitle || 'Untitled Blog';
  const desc = processedData.desc || processedData.blogContent || processedData.blogSubtitle || '';
  const image = processedData.image || processedData.blogImage || 'https://via.placeholder.com/300x180';
  const date = processedData.date || processedData.blogDate || new Date().toISOString();
  const author = processedData.author || processedData.blogAuthor || { name: "Unknown", department: "N/A" };
const summary = processedData.summary || processedData.metaDescription || truncateText(desc, expandDescription === true ? 250 : 100);
  const blogLink = processedData.blogLink || processedData.mediumLink || 'https://medium.com/@fedkiit';

  let parsedAuthor = { name: "Unknown", department: "N/A" };

  try {
    if (typeof author === 'string') {
      if (author.startsWith('{') && author.endsWith('}')) {
        parsedAuthor = JSON.parse(author);
      } else {
        parsedAuthor = { name: author, department: "" };
      }
    } else if (typeof author === 'object' && author !== null) {
      parsedAuthor = author;
      if (!parsedAuthor.department && parsedAuthor.dept) {
        parsedAuthor.department = parsedAuthor.dept;
      }
    }

    if ((!parsedAuthor.department || parsedAuthor.department === "N/A") && processedData.authorDepartment) {
      parsedAuthor.department = processedData.authorDepartment;
    }

    if ((!parsedAuthor.department || parsedAuthor.department === "N/A") && processedData.authorDetails) {
      const authorDetails = typeof processedData.authorDetails === 'string'
        ? JSON.parse(processedData.authorDetails)
        : processedData.authorDetails;

      if (authorDetails?.department) {
        parsedAuthor.department = authorDetails.department;
      } else if (authorDetails?.dept) {
        parsedAuthor.department = authorDetails.dept;
      }
    }
  } catch (err) {
    console.error('Error handling author data:', err);
  }

  const handleBlogClick = () => {
    window.open(blogLink, '_blank');
  };

  return (
    <div
      className={`${styles.card} ${expandDescription ? styles.expandedCard : ''}`}
      onClick={handleBlogClick}
    >
      <div className={styles.imageWrapper}>
        <img className={styles.banner} src={image} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>
            {date ? new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            }) : 'Invalid Date'}
          </p>
        </div>

        <p className={styles.author}>
          By <strong>{parsedAuthor.name}</strong>
        </p>

        <p className={styles.summary}>
          {summary}{" "}
          <a href={blogLink} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
            Read more
          </a>
        </p>

        {customButtons && (
          <div className={styles.customButtons}>
            {customButtons}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogCard;
