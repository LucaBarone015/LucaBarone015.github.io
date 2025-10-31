let triviaBtn = document.querySelector("#js-new-quote").addEventListener('click', newTrivia);
let dadBtn = document.querySelector("#js-new-dad").addEventListener('click', newDad);

let answerBtn = document.querySelector('#js-tweet').addEventListener('click', newAnswer);

let current = {
    question: "",
    answer: "",
}

const endpoint = "https://official-joke-api.appspot.com/jokes/knock-knock/random";
const dadendpoint = "https://official-joke-api.appspot.com/jokes/dad/random";

async function newTrivia() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText)
    }
    const json = await response.json();
    console.log(json);
    displayTrivia(json[0]["setup"]);
    current.question = json[0]["setup"];
    current.answer = json[0]["punchline"];
  } catch (err) {
    console.log(err)
    alert('Failed to get new trivia')
  }

}

async function newDad() {
  try {
    const response = await fetch(dadendpoint);
    if (!response.ok) {
        throw Error(response.statusText)
    }
    const json = await response.json();
    console.log(json);
    displayTrivia(json[0]["setup"]);
    current.question = json[0]["setup"];
    current.answer = json[0]["punchline"];
  } catch (err) {
    console.log(err)
    alert('Failed to get new trivia')
  }
}

function displayTrivia(question) { 
    const questionText = document.querySelector('#js-quote-text');
    questionText.textContent = question;
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = "";
}

function newAnswer () {
    //console.log("Success == answer!");
    const answerText = document.querySelector("#js-answer-text");
    answerText.textContent = current.answer;
}

newTrivia();
