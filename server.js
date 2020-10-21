const express = require('express');
const path = require('path');


//INITIALIZE SERVER======================================================

const app = express();
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started om port ${PORT}`));

//SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, 'public')));

//INIT PARSER AND HANDLE FORM SUBMISSION
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//SET UP API ROUTES
const testApi = require('./api/test');
app.use('/api/test', testApi);