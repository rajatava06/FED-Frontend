import React from 'react';
import styles from './styles/LeftSidebar.module.scss';
<<<<<<< Updated upstream

function LeftSidebar({ 
  selectedDepartment, 
  onSelectDepartment, 
  sortOrder, 
  onSortOrderChange, 
  searchQuery, 
  onSearchChange 
=======
import Input from '../../../components/Core/Input'; 

function LeftSidebar({
  selectedDepartment,
  onSelectDepartment,
  sortOrder,
  onSortOrderChange,
  searchQuery,
  onSearchChange
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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

      
=======
  
  const sortOptions = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <div className={styles.leftSidebar}>
      
      <div className={styles.searchBar}>
        <h3 className={styles.subtitle}>Search</h3>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
    
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Sort By</h3>
        <div className={styles.departmentSelect}>
          <Input
            type="select"
            name="sortOrder"
            value={sortOrder || "latest"}
            placeholder="Latest"
            onChange={(value) => onSortOrderChange(value)}
            options={sortOptions}
            className={styles.sortInput}
          />
        </div>
      </div>
          
      
      <div className={styles.filterSection}>
        <h3 className={styles.subtitle}>Departments</h3>
        <div className={styles.departmentSelect}>
          <Input
            type="select"
            name="departments"
            value={selectedDepartment || ""}
            placeholder="All Departments"
            onChange={(value) =>
              onSelectDepartment(value === "All Departments" ? null : value)
            }
            options={departments.map((dept) => ({ label: dept, value: dept }))}
            className={styles.departmentInput}
          />
        </div>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

<<<<<<< Updated upstream
export default LeftSidebar;
=======
export default LeftSidebar;
>>>>>>> Stashed changes
