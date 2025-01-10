// import React from 'react'
// import styles from '../LeftSidebar/styles/LeftSidebar.module.scss'

// function LeftSidebar() {
//   return (
//     <div className={styles.Sidebar}>
//       <a href="">Technical</a>
//       <a href="">Creative</a>
//       <a href="">Marketing</a>
//       <a href="">Operations</a>
//       <a href="">PR And Finance</a>
//       <a href="">Human Resource</a>
//     </div>
//   )
// }

// export default LeftSidebar


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
    <div className={styles.Sidebar}>
      {departments.map((department) => (
        <a
          key={department}
          href="#"
          className={selectedDepartment === department ? styles.active : ''}
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


