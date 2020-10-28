
//Load Questions
window.addEventListener("DOMContentLoaded", async () => {
    const questions = await getQuestions();
    await displayQuestions(questions);
    const scriptUrl = 'js/index.js';
    loadScript(scriptUrl);
});

//Generate random set function ( equal to min and less than max )
const getRandomSet = (min, max) => Math.floor(Math.random() * (max - min) + min);
  
  
//Get questions function
const getQuestions = async () => {
    try {
        const randomSetNumber = getRandomSet(1,3)+'';
        console.log(randomSetNumber);
        const results = await fetch(`http://localhost:5000/api/test/${randomSetNumber}`);
        return results.json();
    } catch (err) {
        console.log(err);
    }
};

//Display questions function - definition of the function to map questions and choices

const displayQuestions = arrayOfObjects => {

    const questionsDiv =  document.getElementById('questions');
    //Get array with question id numbers
    const helperArray = [];

    arrayOfObjects.forEach(object => {
        helperArray.push(object.question_id);
    });

    const arrayOfQuestionId = [];

    for (let i = 0; i < helperArray.length; i++) {
        if (helperArray[i-1] !== helperArray[i]) arrayOfQuestionId.push(helperArray[i]);
    };


    //Create html string for each question
    let allQuestions = '';

    for (let i = 0; i < arrayOfQuestionId.length; i++) {

        let filtered = arrayOfObjects.filter(object => object.question_id === arrayOfQuestionId[i]);
        //generate question
        allQuestions += `<div id="question${i+1}-container" class="question mb-4 fadeOutLeft"><h4 id="question${i+1}" title="${filtered[0].question_id}">${i+1}. ${filtered[0].question_body}</h4>`;
        //generate all answer choices
        const choices = filtered.map(object => `
                <input id="choice${object.choice_id}" type="radio" name="${filtered[0].question_id}" value="${object.choice_id}" required>
                <label for="choice${object.choice_id}">${object.choice_body}</label>
                <br>
                ` 
        );
        allQuestions += choices.join(''); 
        allQuestions += `   <div class="controls">
                                <button id="previous${i+1}" class="previous m-4 btn btn-primary">Go Back</button>
                                <button id="next${i+1}" class="next m-4 btn btn-primary">Next</button>
                            </div>
                        </div>`;
    };

    if (questionsDiv) {
        questionsDiv.innerHTML = allQuestions;
    }

}


//=================================================================
//Submit answers to database
let submitBtn = document.getElementById('submit_answers');
let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');


if (submitBtn){
    submitBtn.addEventListener('click', submitAnswers);
};

async function submitAnswers (e) {

   e.preventDefault();

   if (validateInput()) {
   const response = await addAnswers();
   const testId = response.testId;
   const results = await getResults(testId);
   await displayResultPage(results);
}
};

//Add user to database function (NOT USED ATM)
// const addUser = async (e) => {

//     await fetch(`http://localhost:5000/api/test/addnewuser`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//                 name: firstName.value,
//                 surname: lastName.value
//         })
//     });

// };


//Add answers
const addAnswers = async () => {

   
    const response = await fetch(`http://localhost:5000/api/test/submittest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(getAnswers())
            });

     return response.json();       

};

//Get answers from frontend - returns object that I can pass to POST body
const getAnswers = () => {

    const form = document.getElementById('test').elements;
    const nameArr = [];
    const answersArr = [];
       
    for (let i = 0; i<form.length; i++) {
        if (form[i].type === 'text') nameArr.push(form[i].value);
        if (form[i].checked === true) {
            answersArr.push(form[i].name);
            answersArr.push(form[i].value);
        };      
    }; 


    const result = {
        name:               nameArr[0],
        surname:            nameArr[1],
        questionOneId:      answersArr[0],
        choiceOneId:        answersArr[1],
        questionTwoId:      answersArr[2],
        choiceTwoId:        answersArr[3],
        questionThreeId:    answersArr[4],
        choiceThreeId:      answersArr[5],
        questionFourId:     answersArr[6],
        choiceFourId:       answersArr[7],
        questionFiveId:     answersArr[8],
        choiceFiveId:       answersArr[9]
    };

    return result;

};
   

//Get results function
const getResults = async (id) => {
    //get results
    try {
        const data = await fetch(`http://localhost:5000/api/test/getresults/${id}`);
        const result = await data.json();
        return result;
       
    } catch (err) {
        console.log(err);
    }
};

//dispaly results - MAKE IT SO IT FETCHES TEMPLATE WITH RESULTS
const displayResultPage = async (resultsObject) => {

    const displayResult = document.getElementById('test-result');
    const score = document.getElementById('score');
    const resultsBox = document.getElementById('results-box');
    const form = document.getElementById('test');

    resultsObject.passed ? displayResult.style.color = 'green' : displayResult.style.color = 'red';


    if(displayResult && score) {
        displayResult.innerHTML = `You ${resultsObject.passed ? "passed" : "failed" }`;
        score.innerHTML = `Your score: ${resultsObject.result*100}%`;
        resultsBox.style.display = 'block';
        form.style.display = 'none';
    } else {
        console.log ('Page elements not found');
    }
};

//Validate Form
 function validateInput() {
    const form = document.getElementById('test').elements;
    const name = document.getElementById('first_name');
    const surname = document.getElementById('last_name');
    let formValid = false;
    let counter = 0;
    console.log('before' + counter);

    if (name.value !== '' && surname.value !== '') counter++;
    
    for (let i = 0; i < form.length; i++) {
        if (form[i].checked) counter++; 
    };

    if (counter !== 6) {
            alert('Fill out all fields')
    } else {
            formValid = true;
      }

    console.log('after' + counter);

    return formValid;
}

//Try again

const tryAgainBtn = document.getElementById('try-again');
tryAgainBtn.addEventListener('click', () => location.reload());

//Load script function
function loadScript (url) {
    let script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}