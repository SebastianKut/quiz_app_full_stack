# Fullstack QUIZ APP

Quiz app build from scratch with:
##### HTML, CSS, Vanilla JS, Node, Express and MySql.

It displays random 5-question quiz from MySql database. Data is fetched through REST API build with Node JS and Express.

Answers are posted to database and checked for being correct, then results are calculated server-side and sent to frontend via API.

## API

http://domain-name.com/api/test/$set_number get method, fetches relevant set of questions from MySQL database, where "$set_number" represents set of questions. Currently there are 2 different sets of 5 questions in the database.

http://domain-name.com/api/test/submittest - post method, submits answers and user details to database. Body object requires following key-values. 

        {
            name: VARCHAR, 
            surname: VARCHAR,
            questionOneId: INTEGER, 
            choiceOneId: INTEGER, 
            questionTwoId: INTEGER,
            choiceTwoId: INTEGER,
            questionThreeId: INTEGER,
            choiceThreeId: INTEGER,
            questionFourId: INTEGER,
            choiceFourId: INTEGER,
            questionFiveId: INTEGER,
            choiceFiveId: INTEGER
        }

Response is JSON object with testID. 

http://domain-name.com/api/test/getresults/$testid - checks result of submitted test using $testid and returns JSON with results.   


