import React from 'react';
import { Button } from '@mantine/core'; // Import Button from Mantine
import styles from './MyMantineButton.module.css'; // Import CSS Module

function MyMantineButton() {
  return (
    <div className={styles.wrapper}>
      <Button variant="filled" color="cyan">
        Mantine Button
      </Button>
      <span className={styles.labelText}>Styled with CSS Modules</span>
    </div>
  );
}

export default MyMantineButton; 