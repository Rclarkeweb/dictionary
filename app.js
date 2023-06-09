// Select elements
const wordInput = document.getElementById("wordInput");
const displayWord = document.getElementById("displayWord");
const partOfSpeech = document.getElementById("partOfSpeech");
const definition = document.getElementById("definition");
const errorMsg = document.getElementById("errorMsg");
const unknown = document.getElementById("unknown");

// API Function
const searchWord = () => {

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


