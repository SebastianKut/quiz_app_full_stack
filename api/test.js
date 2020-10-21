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
        first_name: req.body.name, 
        last_name: req.body.surname
    };

    if (!newUser.first_name || !newUser.last_name) {
        return res.status(400).json({msg: 'Please include first and last name'});
    };

    const sql = 'INSERT IGNORE INTO users SET ?'; //siliently ignores errors when adding data 

    const query = db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added...');
    })



});


//Get set of questions
router.get('/:set', (req, res) => { 



    // //check if id is found by using "some" method that returns boolean
    // const found = members.some(member => member.id === parseInt(req.params.set));
    
    // if(found){
    // res.json(members.filter(member => member.id === parseInt(req.params.set)));
    // } else { //if not found we give status response 400 meaning its a bad request and a json object with message
    //     res.status(400).json({msg: `No set number ${req.params.set} found`});
    // }
 });



module.exports = router;