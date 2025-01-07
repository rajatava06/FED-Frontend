/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './styles/BlogCard.module.scss'

function BlogCard() {
  return (
    <div className ={styles.frame}>

         <div className ={styles.leftFrame}>
           <h1 className = {styles.heading}>Fixing This One Mistake Helped 2x My Earnings on Medium </h1>
           <p className={styles.startLine}>It goes against everything I knew about traditional SEO</p>
           <div className={styles.interaction}>
              <p className={styles.date}>date</p>
              <p className={styles.clap}>clap</p>
              <p className={styles.comments}>comments</p>
           </div>
         </div>

         <div className={styles.rightFrame}>
            <div className={styles.image}></div>
         </div>

    </div>
  )
}

export default BlogCard
