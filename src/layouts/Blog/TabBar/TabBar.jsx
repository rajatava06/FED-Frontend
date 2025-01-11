import React from "react";
import styles from "./styles/TabBar.module.scss";

const TabBar = ({ headings }) => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.tabBar}>
      <h3 className={styles.title}>Contents</h3>
      <ul>
        {headings.map((heading, index) => (
          <li
            key={index}
            onClick={() => handleScrollTo(heading.id)}
            onKeyDown={() => handleScrollTo(heading.id)}
            className={styles.tabItem}
          >
            {heading.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabBar;
