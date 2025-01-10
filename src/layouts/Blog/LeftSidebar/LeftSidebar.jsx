import React from 'react';
import styles from '../LeftSidebar/styles/LeftSidebar.module.scss';

function LeftSidebar({ selectedDepartment, onSelectDepartment }) {
  const departments = [
    "All Departments",
    "Technical",
    "Creative",
    "Marketing",
    "Operations",
    "PR And Finance",
    "Human Resource",
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Departments</h2>
      {departments.map((department) => (
        <a
          key={department}
          href="#"
          className={`${styles.link} ${
            selectedDepartment === department ? styles.active : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            onSelectDepartment(department === "All Departments" ? null : department);
          }}
        >
          {department}
        </a>
      ))}
    </div>
  );
}

export default LeftSidebar;
