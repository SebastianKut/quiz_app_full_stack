const mysql = require('mysql');
const express = require('express');
const router = express.Router();


//Create connection=========================================
const db = mysql.createConnection({
    host:       'localhost',
    user:       'admin',
    password:   'test1234',
    database:   'quiz'
});

//Connect to db===============================================
//In case of problems with connection run the query in the db 
//ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test1234';
//FLUSH PRIVILEGES;

db.connect((err) => {
    if (err) {
        throw err;
    } console.log('MySql Connected...');
})

//Create user
router.post('/addnewuser', (req, res) => {
    
    const newUser = {
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
    };

    if (!newUser.first_name || !newUser.last_name) {
        return res.status(400).json({msg: 'Please include first and last name'});
    };

    const sql = 'INSERT INTO users SET ?';

    const query = db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added...');
    })



});



module.exports = router;