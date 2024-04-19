const questions = [
    {
        question:"Which is the largest Country in the world?",
        answers:[
            {text:"United States of America", correct:false},
            {text:"China", correct:false},
            {text:"Russia", correct:true},
            {text:"Canada", correct:false},
        ]
    },{
        question:"Which is the smallest Continent in the world?",
        answers:[
            {text:"Asia", correct:false},
            {text:"Europe", correct:false},
            {text:"Africa", correct:false},
            {text:"Australia", correct:true},
        ]
    },
    {
        question:"Which is the largest River in the world?",
        answers:[
            {text:"Nile", correct:true},
            {text:"Congo", correct:false},
            {text:"Amazon", correct:false},
            {text:"Yellow", correct:false},
        ]
    },
    {
        question:"Which is the third closest planet to the Sun?",
        answers:[
            {text:"Venus", correct:false},
            {text:"Mercury", correct:false},
            {text:"Pluto", correct:false},
            {text:"Earth", correct:true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}
function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}

function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showscore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }
    else{
        startQuiz()
    }
})
startQuiz()