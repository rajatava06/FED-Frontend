import React from 'react';
import styles from './styles/LeftSidebar.module.scss';

function LeftSidebar({ 
  selectedDepartment, 
  onSelectDepartment, 
  sortOrder, 
  onSortOrderChange, 
  searchQuery, 
  onSearchChange 
}) {
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
      {/* Search Bar */}
      <input style={
        {
          'padding': "8px",
          "borderRadius": "10px",
          "border": "1px solid rgba(255, 190, 11, 0.84)",
          "background": "transparent",
          "color" : "#fff"
        }
      }
        type="text"
        placeholder="Search blogs..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.searchInput}
      />

      {/* Sort Options */}
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Sort By</h3>
        <a
          href="#"
          className={`${styles.link} ${
            sortOrder === 'latest' ? styles.active : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            onSortOrderChange('latest');
          }}
        >
          Latest
        </a>
        <a
          href="#"
          className={`${styles.link} ${
            sortOrder === 'oldest' ? styles.active : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            onSortOrderChange('oldest');
          }}
        >
          Oldest
        </a>
      </div>

      {/* Department Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Departments</h3>
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

      
    </div>
  );
}

export default LeftSidebar;
