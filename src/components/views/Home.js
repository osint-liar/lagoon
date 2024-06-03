// For Home.js and About.js, wrap the content with Typography components
import React from "react";
import Typography from '@mui/material/Typography';

// Home.js
export default function Home() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Home Page</Typography>
      <Typography>Welcome to the Home Page!</Typography>
    </div>
  );
}