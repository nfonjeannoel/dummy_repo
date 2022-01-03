const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
let typed = document.getElementById('typed');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

startButton = document.getElementById('start')
startButton.addEventListener('click', () => {

    startButton.innerText = "restart"

    const quoteIndex = (Math.floor(Math.random() * quotes.length));
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(word => {
        return '<span>' + word + ' </span>'
    });
    quoteElement.innerHTML = spanWords.join('')
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    startTime = new Date().getTime();
})

typedValueElement.addEventListener('input', () => {

    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;

        let highScore = localStorage.getItem('highScore');
        console.log(`initial high score is ${highScore}`)
        let newScore;
        if (highScore !== null) {
            //    compare and update highscore
            newScore = elapsedTime < parseFloat(highScore) ? elapsedTime / 1000 : highScore;
            localStorage.setItem('highScore', newScore);
            console.log(`original high score is present, new score is ${newScore}`)
        } else {
            //    no highscore exist, create a new one
            localStorage.setItem('highScore', elapsedTime.toString());
            console.log(`original high score is not present, new score is ${newScore}`)
            newScore = elapsedTime / 1000
        }

        typed.style.visibility = 'collapse';
        messageElement.style.color = '#21de21'
        startButton.innerText = "start"
        // messageElement.innerText = x = `You finished ${words.length} words in ${elapsedTime / 1000} seconds.`;
        typedValueElement.removeEventListener('input', () => {
        })
        typedValueElement.value = "";
        // typedValueElement.style.visibility = 'collapse';
        modal.style.display = "block";
        document.getElementById("modal-message").innerText = `You finished ${words.length} words in ${elapsedTime / 1000} seconds.
        
        High score: ${newScore} `;


    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typed.innerText = ` ${wordIndex + 1} of ${words.length} completed in ${(new Date().getTime() - startTime) / 1000} seconds `
        typedValueElement.value = '';
        // move to the next word
        wordIndex++;
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = '';
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = '';
    } else {
        // error state
        typedValueElement.className = 'error';
    }

})


myStorage = window.localStorage;





