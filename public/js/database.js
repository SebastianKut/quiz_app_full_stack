//Load Questions
window.addEventListener("DOMContentLoaded", async () => {
    const questions = await getQuestions();
    console.log(questions);
   // displayQuestions(questions);
});

//Get questions
const getQuestions = async () => {
    try {
        const results = await fetch('http://localhost:5000/api/test/2');
        return results.json();
    } catch (err) {
        console.log(err);
    }
};

//Display questions - definition of the function to map questions and choices




let submitBtn = document.getElementById('submit_answers');
let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');

//Submit answers to database
if (submitBtn){
    submitBtn.addEventListener('click', submitAnswers);
};

function submitAnswers (e) {
    addUser(e);
};

//Add user to database
const addUser = async (e) => {

    e.preventDefault();

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




