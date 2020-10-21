let startBtn = document.getElementById('start_test');
let firstName = document.getElementById('first_name');
let lastName = document.getElementById('last_name');

//Add user to database
if (startBtn){
    startBtn.addEventListener('click', async (e) => {

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

    });

};

