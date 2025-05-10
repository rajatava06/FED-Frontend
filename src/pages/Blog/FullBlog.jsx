import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles/FullBlog.module.scss";
import data from "../../data/Blog.json";
import RightSidebar from "../../layouts/Blog/RightSidebar/RightSidebar";
import { ChatBot } from "../../features";

const FullBlog = () => {
  const { id } = useParams();
  const [headings, setHeadings] = useState([]);
  const blog = data.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (blog?.blogContent) {
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
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.notFoundContainer}>
          <p className={styles.notFound}>Blog not found.</p>
        </div>
      </div>
    );
  }

  const {
    blogHeading,
    blogContent,
    blogImage,
    authorName,
    authorDepartment,
    dateOfPosting,
    publicReaction = { likes: 0, comments: [] },
  } = blog;

  const handleReadOnMedium = () => {
    window.open(
      "https://medium.com/@fedkiit/talent-building-in-hr-from-recruitment-to-development-859d5a7681ee",
      "_blank"
    );
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.fullBlogContainer}>
        <div className={styles.contentArea}>
          <article className={styles.fullBlog}>
            <header className={styles.blogHeader}>
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
                  <br />
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>By {authorName}</span>
                    <span className={styles.authorDept}>{authorDepartment}</span>
                    <time className={styles.date}>
                      Posted on: {new Date(dateOfPosting).toDateString()}
                    </time>
                  </div>
                </div>
              </div>
            </header>

            <footer className={styles.blogFooter}>
              <div className={styles.reactions}>
                <p className={styles.likes}>
                  <span className={styles.reactionIcon}>Likes:</span>{" "}
                  {publicReaction.likes ?? 0}
                </p>
                <p className={styles.comments}>
                  <span className={styles.reactionIcon}>Comments:</span>{" "}
                  {publicReaction.comments?.length ?? 0}
                </p>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.summarizeButton}
                  onClick={handleReadOnMedium}
                >
                  More on Medium
                </button>
              </div>
            </footer>
          </article>
        </div>

        <aside className={styles.sidebarArea}>
          <RightSidebar blogs={data} />
          <div className={styles.chatBotWrapper}>
            <ChatBot />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FullBlog;
