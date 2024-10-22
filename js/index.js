const questions = [
    // Nivel 1: Fácil
    {
        question: "¿Qué significa HTML?",
        answers: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        correct: 0,
        level: 1
    },
    {
        question: "¿Cuál es el lenguaje de programación más popular para desarrollo web frontend?",
        answers: ["Java", "Python", "JavaScript", "C++"],
        correct: 2,
        level: 1
    },
    // Nivel 2: Medio
    {
        question: "¿Qué significa CSS?",
        answers: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2,
        level: 2
    },
    {
        question: "¿Cuál de los siguientes no es un tipo de dato en JavaScript?",
        answers: ["Number", "Boolean", "String", "Float"],
        correct: 3,
        level: 2
    },
    // Nivel 3: Difícil
    {
        question: "¿Qué es una closure en JavaScript?",
        answers: ["Un error en el código", "Una función que tiene acceso a variables en su ámbito léxico", "Un tipo de bucle", "Un método para cerrar una conexión"],
        correct: 1,
        level: 3
    },
    {
        question: "¿Qué significa ACID en el contexto de bases de datos?",
        answers: ["Atomicity, Consistency, Isolation, Durability", "Advanced Computer Interface Design", "Automated Code Integration and Deployment", "Algorithm Complexity in Databases"],
        correct: 0,
        level: 3
    },
    {
        question: "¿Cuál de las siguientes opciones NO es un paradigma de programación?",
        answers: ["Programación Orientada a Objetos (POO)", "Programación Funcional", "Programación Lógica", "Compilación Automática de Código (CAC)"],
        correct: 2,
        level: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 45;
let lifelinesUsed = {
    friend: false,
    audience: false,
    fiftyFifty: false,
    changeQuestion: false
};

const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('time');
const scoreEl = document.getElementById('score-value');
const levelEl = document.getElementById('level-value');
const messageEl = document.getElementById('message');
const startButton = document.getElementById('start-game');
const quitButton = document.getElementById('quit-game');
const gameArea = document.getElementById('game-area');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');

startButton.addEventListener('click', startGame);
quitButton.addEventListener('click', quitGame);
playAgainButton.addEventListener('click', startGame);

document.getElementById('friend').addEventListener('click', () => useLifeline('friend'));
document.getElementById('audience').addEventListener('click', () => useLifeline('audience'));
document.getElementById('fifty-fifty').addEventListener('click', () => useLifeline('fiftyFifty'));
document.getElementById('change-question').addEventListener('click', () => useLifeline('changeQuestion'));

function startGame() {
    currentQuestion = 0;
    score = 0;
    lifelinesUsed = { friend: false, audience: false, fiftyFifty: false, changeQuestion: false };
    updateScore();
    updateLevel();
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    gameArea.style.display = 'block';
    nextQuestion();
}

function nextQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    answersEl.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersEl.appendChild(button);
    });

    resetTimer();
    messageEl.textContent = '';
    enableLifelines();
}

function selectAnswer(index) {
    clearInterval(timer);
    const question = questions[currentQuestion];
    const buttons = answersEl.getElementsByTagName('button');

    if (index === question.correct) {
        score += question.level * 1000;
        updateScore();
        buttons[index].classList.add('correct');
        messageEl.textContent = '¡Correcto!';
        setTimeout(() => {
            if (confirm('¡Respuesta correcta! ¿Quieres continuar jugando?')) {
                currentQuestion++;
                updateLevel();
                nextQuestion();
            } else {
                endGame();
            }
        }, 1500);
    } else {
        buttons[index].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
        messageEl.textContent = 'Incorrecto. La respuesta correcta era: ' + question.answers[question.correct];
        setTimeout(endGame, 2000);
    }

    for (let button of buttons) {
        button.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 45;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            messageEl.textContent = '¡Se acabó el tiempo!';
            endGame();
        }
    }, 1000);
}

function updateScore() {
    scoreEl.textContent = score;
}

function updateLevel() {
    levelEl.textContent = currentQuestion < questions.length ? questions[currentQuestion].level : 3;
}

function endGame() {
    clearInterval(timer);
    gameArea.style.display = 'none';
    endScreen.style.display = 'block';
    finalScoreEl.textContent = `Tu puntuación final es: $${score}`;
}

function quitGame() {
    if (confirm('¿Estás seguro de que quieres retirarte?')) {
        endGame();
    }
}

function enableLifelines() {
    document.getElementById('friend').disabled = lifelinesUsed.friend;
    document.getElementById('audience').disabled = lifelinesUsed.audience;
    document.getElementById('fifty-fifty').disabled = lifelinesUsed.fiftyFifty;
    document.getElementById('change-question').disabled = lifelinesUsed.changeQuestion;
}

function useLifeline(lifeline) {
    lifelinesUsed[lifeline] = true;
    document.getElementById(lifeline === 'fiftyFifty' ? 'fifty-fifty' : lifeline).disabled = true;

    switch (lifeline) {
        case 'friend':
            messageEl.textContent = 'Tu amigo sugiere: ' + questions[currentQuestion].answers[questions[currentQuestion].correct];
            break;
        case 'audience':
            const audienceHelp = generateAudienceHelp();
            messageEl.textContent = 'Ayuda del público: A: ' + audienceHelp[0] + '%, B: ' + audienceHelp[1] + '%, C: ' + audienceHelp[2] + '%, D: ' + audienceHelp[3] + '%';
            break;
        case 'fiftyFifty':
            const buttons = answersEl.getElementsByTagName('button');
            let eliminated = 0;
            for (let i = 0; i < buttons.length; i++) {
                if (i !== questions[currentQuestion].correct && eliminated < 2) {
                    buttons[i].style.display = 'none';
                    eliminated++;
                }
            }
            break;
        case 'changeQuestion':
            currentQuestion++;
            if (currentQuestion >= questions.length) {
                currentQuestion = 0;
            }
            nextQuestion();
            break;
    }
}

function generateAudienceHelp() {
    const correct = questions[currentQuestion].correct;
    const percentages = [0, 0, 0, 0];
    percentages[correct] = Math.floor(Math.random() * 30) + 40; // 40-70% for correct answer
    const remaining = 100 - percentages[correct];
    for (let i = 0; i < 4; i++) {
        if (i !== correct) {
            percentages[i] = i === 3 ? remaining : Math.floor(Math.random() * remaining);
        }
    }
    return percentages;
}

//MUSICA
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");
    const toggleAudioButton = document.getElementById("toggle-audio");
    const startGameButton = document.getElementById("start-game");
    const quitGameButton = document.getElementById("quit-game"); // Botón "Retirarse"
    let isAudioPlaying = false;

    // Iniciar el juego y la música cuando el usuario haga clic en "Iniciar Juego"
    startGameButton.addEventListener("click", function () {
        audio.play().then(() => {
            isAudioPlaying = true;
            toggleAudioButton.textContent = '🔊'; 
        }).catch(error => {
            console.error("Error al intentar reproducir la música: ", error);
        });
    });

    toggleAudioButton.addEventListener("click", function () {
        if (isAudioPlaying) {
            audio.pause();
            toggleAudioButton.textContent = '🔇';
        } else {
            audio.play().then(() => {
                toggleAudioButton.textContent = '🔊';
            }).catch(error => {
                console.error("Error al intentar reproducir la música: ", error);
            });
        }
        isAudioPlaying = !isAudioPlaying;
    });

    quitGameButton.addEventListener("click", function () {
        if (isAudioPlaying) {
            audio.pause();
            isAudioPlaying = false; 
            toggleAudioButton.textContent = '🔇'; 
        }
    });
});

