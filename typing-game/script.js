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

document.getElementById('start').addEventListener('click', ()=>{
    const quoteIndex = (Math.floor(Math.random() * quotes.length));
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    wordIndex = 0;
    const spanWords = words.map(word => {return '<span>' +word + ' </span>'});
    quoteElement.innerHTML = spanWords.join('')
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    startTime = new Date().getTime();
})

typedValueElement.addEventListener('input', ()=>{
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;
    if (typedValue === currentWord && wordIndex === words.length - 1){
        const elapsedTime = new Date().getTime() - startTime;
        messageElement.innerText = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord){
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









