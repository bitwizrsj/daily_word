const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const apiUrl = 'https://api.wordsapi.com/v2/words/?random=true&partOfSpeech=noun,verb,adjective,adverb&frequencyMin=7&frequencyMax=10&api_key=' + apiKey;

function fetchWordOfTheDay() {
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const wordData = {
                word: data.word,
                definition: data.results[0].definition,
                examples: data.results[0].examples || ["Example sentence not available."]
            };
            return wordData;
        });
}

function getWordOfTheDay() {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
    chrome.storage.local.get(['lastWordDate', 'wordData'], function(result) {
        if (result.lastWordDate !== today) {
            fetchWordOfTheDay().then(wordData => {
                chrome.storage.local.set({ lastWordDate: today, wordData: wordData });
                displayWordOfTheDay(wordData);
            });
        } else {
            displayWordOfTheDay(result.wordData);
        }
    });
}

function displayWordOfTheDay(wordData) {
    document.getElementById('word').innerText = wordData.word;
    document.getElementById('definition').innerText = wordData.definition;
    document.getElementById('example').innerText = wordData.examples[Math.floor(Math.random() * wordData.examples.length)];
}

document.addEventListener('DOMContentLoaded', getWordOfTheDay);
