const mysql = require('mysql');
const express = require('express');
const router = express.Router();


//Create connection=========================================
const db = mysql.createConnection({
    host:       'localhost',
    user:       'admin',
    password:   'test1234',
    database:   'quiz',
    multipleStatements: true
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

//CREATE USER 
router.post('/addnewuser', (req, res) => {
    
    //data from front-end
    const newUser = {
        first_name: req.body.name, 
        last_name: req.body.surname
    };

    if (!newUser.first_name || !newUser.last_name) {
        return res.status(400).json({msg: 'Please include first and last name'});
    };

    const sql = 'INSERT IGNORE INTO users SET ?'; //INSERT IGNORE siliently ignores errors when adding data 

    db.query(sql, newUser, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User added...');
    });

});


//GET SET OF QUESTIONS
router.get('/:set', (req, res) => { 

    const sql = `SELECT
    questions.question_id,
    questions.question_body,
    questions.is_multiple_choice,
    questions.set_number,
    question_choices.choice_id,
    question_choices.choice_body
    FROM questions
    INNER JOIN question_choices on question_choices.questions_id = questions.question_id
    ORDER BY questions.set_number;`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const questions = result;
        console.log(result);
        const found = questions.some(question => question.set_number === parseInt(req.params.set));

        if (found) {
            res.json(questions.filter(question => question.set_number === parseInt(req.params.set)));
            } else { 
                res.status(400).json({msg: `No set number ${req.params.set} found`});
            }
    });           

 });



 // '/submitanswers
 router.post('/submittest', (req, res) => {
    
    //data from front-end
    const data = [req.body.name, req.body.surname, req.body.questionOneId, req.body.choiceOneId, req.body.questionTwoId, req.body.choiceTwoId, req.body.questionThreeId, req.body.choiceThreeId, req.body.questionFourId, req.body.choiceFourId, req.body.questionFiveId, req.body.choiceFiveId];
    
    const sql = `INSERT INTO users (first_name, last_name) VALUES (?,?);
                 INSERT INTO tests (users_id) VALUES (LAST_INSERT_ID());
                 INSERT INTO answers (questions_id, choices_id, tests_id) VALUES 
                        ((SELECT question_id FROM questions WHERE question_id = ?),
                        (SELECT choice_id FROM question_choices WHERE choice_id = ?),
                        LAST_INSERT_ID()),
                        ((SELECT question_id FROM questions WHERE question_id = ?),
                        (SELECT choice_id FROM question_choices WHERE choice_id = ?),
                        LAST_INSERT_ID()),
                        ((SELECT question_id FROM questions WHERE question_id = ?),
                        (SELECT choice_id FROM question_choices WHERE choice_id = ?),
                        LAST_INSERT_ID()),
                        ((SELECT question_id FROM questions WHERE question_id = ?),
                        (SELECT choice_id FROM question_choices WHERE choice_id = ?),
                        LAST_INSERT_ID()),
                        ((SELECT question_id FROM questions WHERE question_id = ?),
                        (SELECT choice_id FROM question_choices WHERE choice_id = ?),
                        LAST_INSERT_ID());`

    db.query(sql, data, (err, result) => {
        if (err) throw err;
        const testId = result[1].insertId;
        res.json({message: 'Answers submitted', testId: testId});
    });

});


 // GET RESULTS - FIGURE OUT WHAT SQL QUERY I NEED AND HOW TO ADD USER ID TO ANSWERS WHEN SUBMITTING BECAUSE IT DOESNT ADD ATM
 router.get('/getresults/:testid', (req, res) => { 

    const sql = `SELECT
    questions.question_id,
    questions.question_body,
    questions.is_multiple_choice,
    questions.set_number,
    question_choices.choice_id,
    question_choices.choice_body
    FROM questions
    INNER JOIN question_choices on question_choices.questions_id = questions.question_id
    ORDER BY questions.set_number;`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        const questions = result;
        console.log(result);
        const found = questions.some(question => question.set_number === parseInt(req.params.set));

        if (found) {
            res.json(questions.filter(question => question.set_number === parseInt(req.params.set)));
            } else { 
                res.status(400).json({msg: `No set number ${req.params.set} found`});
            }
    });           

 });



module.exports = router;