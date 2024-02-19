const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./utils/database')

// Define the path to the 'public' directory
const publicPath = path.join(__dirname, '../FrontEnd/public');

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(publicPath));

// Import route handlers
const indexRoutes = require('./routes/index');
const expenseRoutes = require('./routes/expense');
const adminExpenseRoutes = require('./routes/admin')

// Use route handlers
app.use('/expenseadmin', adminExpenseRoutes)
app.use('/expense', indexRoutes);
app.use('/expense', expenseRoutes);

// Start the server
const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => app.listen(PORT, () => {
        //print the port number on which server listens
        console.log(`Server is running on port ${PORT}`);
    }))
    .catch(err => console.log(err));