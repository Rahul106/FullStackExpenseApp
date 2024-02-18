const express = require('express');
const path = require('path');

const app = express();

// Define the path to the 'public' directory
const publicPath = path.join(__dirname, '../FrontEnd/public');

// Other route handlers or middleware can be added here

// Serve static files from the 'public' directory
app.use(express.static(publicPath));

// Import route handlers
const indexRoutes = require('./routes/index');

// Use route handlers
app.use('/expense', indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
