const express = require('express');
const path = require('path');


//INITIALIZE SERVER======================================================

const app = express();

//INIT PARSER AND HANDLE FORM SUBMISSION
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, 'public')));


//SET UP API ROUTES
const testApi = require('./api/test');
app.use('/api/test', testApi);