// Select elements
const wordInput = document.getElementById("wordInput");
const displayWord = document.getElementById("displayWord");
const partOfSpeech = document.getElementById("partOfSpeech");
const definition = document.getElementById("definition");
const errorMsg = document.getElementById("errorMsg");
const unknown = document.getElementById("unknown");
const button = document.getElementById("findWord");

const home = document.getElementById('home');

const result = document.getElementById("results");

const serif = document.getElementById("serif");
const sans = document.getElementById("sans");
const mono = document.getElementById("mono");

// API Function
const search = (event) => {

    // If input is empty display message
    if (wordInput.value == '') {
        errorMsg.innerText = 'Please enter a word';
        displayWord.innerHTML = '';
        partOfSpeech.innerHTML = '';
        definition.innerHTML = '';
        unknown.innerHTML = '';
    
    // If input contains a value search for the word
    } else {
        errorMsg.innerHTML = '';
        const userWord = wordInput.value;
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`
        fetch(url).then(response => {
        return response.json();
        })
        .then(word => {
            
            // Display User Word
            displayWord.innerHTML = `${userWord.toUpperCase()}`;

            // Check if the word exists
            try {
                // Display part of speech (noun, verb)
                partOfSpeech.innerHTML = word[0].meanings[0].partOfSpeech;
                unknown.innerHTML = '';
            }
            catch(err) {
                // Display error message if word doesn't exist
                unknown.innerHTML = "Oops, that word doesn't exist";
                partOfSpeech.innerHTML = '';
                definition.innerHTML = '';

            };

            // Display single definition
            var singleWordDefinition = word[0].meanings[0].definitions[0].definition;
            definition.innerHTML = `${singleWordDefinition}`;

        })

        // Clear Input Field
        wordInput.value = '';

        return false;
    };
};

// Search for the word 
button.addEventListener('click', search, false);

// Add Serif font
serif.addEventListener('click', function (event) {
    serif.style.backgroundColor = '#ccc';
    mono.style.backgroundColor = 'transparent';
    sans.style.backgroundColor = 'transparent';

    result.classList.remove("font-sans");
    result.classList.remove("font-mono");
    result.classList.add("font-serif");

    wordInput.classList.remove("font-sans");
    wordInput.classList.remove("font-mono");
    wordInput.classList.add("font-serif");

}, false);

// Add Sans Font
sans.addEventListener('click', function (event) {
    serif.style.backgroundColor = 'transparent';
    mono.style.backgroundColor = 'transparent';
    sans.style.backgroundColor = '#ccc';

    var result = document.getElementById("results");
    result.classList.remove("font-serif");
    result.classList.remove("font-mono");
    result.classList.add("font-sans");

    wordInput.classList.remove("font-serif");
    wordInput.classList.remove("font-mono");
    wordInput.classList.add("font-sans");

}, false);

// Add Mono font
mono.addEventListener('click', function (event) {
    serif.style.backgroundColor = 'transparent';
    mono.style.backgroundColor = '#ccc';
    sans.style.backgroundColor = 'transparent';

    var result = document.getElementById("results");
    result.classList.remove("font-sans");
    result.classList.remove("font-serif");
    result.classList.add("font-mono");

    wordInput.classList.remove("font-sans");
    wordInput.classList.remove("font-serif");
    wordInput.classList.add("font-mono");

}, false);

function darklight() {
    var body = document.body;
    var header = document.getElementById("header");

    if (body.classList.contains("darkMode")) {
        body.classList.remove("darkMode");
        body.classList.add("lightMode");
        
        header.style.color = '#000';
        result.style.color = '#000';
    } else {
        body.classList.remove("lightMode");
        body.classList.add("darkMode");
        header.style.color = '#fff';
        result.style.color = '#fff';
    }

    var x = document.getElementById("toggle");
    if (x.innerHTML === '<i class="fa-solid fa-moon"></i>') {
        x.innerHTML = '<i class="fa-solid fa-sun"></i>';
        x.style.backgroundColor = 'ghostwhite';
        x.style.color = 'dimgray';
    } else {
        x.innerHTML = '<i class="fa-solid fa-moon"></i>';
        x.style.backgroundColor = 'lightgray';
        x.style.color = 'black';
    };
}


// Refresh the page 
home.addEventListener('click', function (event) {
    location.reload();
}, false);