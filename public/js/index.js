
   const start = document.getElementById('start-test');
   const prevButtons = document.querySelectorAll('.previous');
   const nextButtons = document.querySelectorAll('.next');

    console.log(start);
    console.log(prevButtons);
    console.log(nextButtons);

    start.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('clicked');
        document.getElementById('question1-container').classList.add('active');
        document.getElementById('details-section').classList.remove('active');
        
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', goToQuestion);
    });

    nextButtons.forEach(button => {
        button.addEventListener('click', goToQuestion);
    });
    
    function goToQuestion (e) {

        e.preventDefault();
        
        if(e.target.id === 'next1' || e.target.id === 'next2' || e.target.id === 'next3' || e.target.id === 'next4') {
            e.target.parentElement.parentElement.classList.remove('active');
            e.target.parentElement.parentElement.nextElementSibling.classList.add('active');
        }

        if(e.target.id === 'previous2' || e.target.id === 'previous3' || e.target.id === 'previous4' || e.target.id === 'previous5') {
            e.target.parentElement.parentElement.classList.remove('active');
            e.target.parentElement.parentElement.previousElementSibling.classList.add('active');
        }

        if(e.target.id === 'next5') {
            submitBtn.style.display = 'inline-block';
        }

        if(e.target.id === 'previous1') {
            e.target.parentElement.parentElement.classList.remove('active');
            document.getElementById('details-section').classList.add('active');
        }

    }


