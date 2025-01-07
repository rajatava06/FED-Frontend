/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './styles/BlogCard.module.scss'

function BlogCard(props) {
  const { data } = props;
  const { blogHeading, blogImage, dateOfPosting, publicReaction } = data;
  
  return (
    <div className ={styles.frame}>
    <div className={styles.rightFrame}>
        <div className={styles.image}>
          <img src={blogImage} alt={blogHeading} />
        </div>
            </div>

         <div className ={styles.leftFrame}>
          <h1 className = {styles.heading}>{blogHeading} </h1>
           <p className={styles.startLine}>It goes against everything I knew about traditional SEO</p>
           <div className={styles.interaction}>
              <p className={styles.date}>date</p>
              <p className={styles.clap}>{publicReaction.likes}</p>
              <p className={styles.comments}>{publicReaction.comments.length}</p>
           </div>
         </div>

         

    </div>
  )

}

export default BlogCard
