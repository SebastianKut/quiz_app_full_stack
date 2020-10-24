//Load Questions
window.addEventListener("DOMContentLoaded", async () => {
    const questions = await getQuestions();
    displayQuestions(questions);
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
        allQuestions += `<p id="question${i+1}" title="${filtered[0].question_id}">${filtered[0].question_body}</p>`;
        //generate all answer choices
        const choices = filtered.map(object => `
                <input id="choice${i+1}" type="radio" name="choice" value="${object.choice_id}">
                <label for="choice${i+1}">${object.choice_body}</label><br>
                ` 
        );
        allQuestions += choices.join(''); 
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

function submitAnswers (e) {

    e.preventDefault();

    addAnswers(e);
    getResults(e);

};

//Add user to database function (NOT USED ATM)
const addUser = async (e) => {

    await fetch(`http://localhost:5000/api/test/addnewuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                name: firstName.value,
                surname: lastName.value
        })
    });

};

//Add answers
const addAnswers = async (e) => {

    await fetch(`http://localhost:5000/api/test/submittest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({//FIGURE OUT HOW TO GET THOSE VALUES FROM THE FORM BEST WAY
                        name: firstName.value,
                        surname: lastName.value,
                        questionId: '',//?????????????
                        choiceId: ''//????????????????
                })
            });


};

//Get results
const getResults = async (e) => {
//get results by fetching api
//redirect to results page
};