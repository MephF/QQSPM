document.addEventListener('DOMContentLoaded', () => {
    const gameState = {
        currentQuestion: 0,
        score: 0,
        timeLeft: 45,
        lifelinesUsed: { friend: false, audience: false, fiftyFifty: false, changeQuestion: false },
        timer: null,
        isLifelineActive: false,
        fiftyFiftyUsed: false,
        lifelineUsedThisQuestion: false
    };

    const LIFELINE_COST = 500; // Costo de usar un comodín

    const elements = {
        questionEl: document.getElementById('question'),
        answersEl: document.getElementById('answers'),
        timerEl: document.getElementById('time'),
        scoreEl: document.getElementById('score-value'),
        levelEl: document.getElementById('level-value'),
        messageEl: document.getElementById('message'),
        startButton: document.getElementById('start-game'),
        quitButton: document.getElementById('quit-game'),
        gameArea: document.getElementById('game-area'),
        startScreen: document.getElementById('start-screen'),
        endScreen: document.getElementById('end-screen'),
        finalScoreEl: document.getElementById('final-score'),
        playAgainButton: document.getElementById('play-again'),
        audio: document.getElementById('background-music'),
        toggleAudioButton: document.getElementById('toggle-audio'),
        lifelineActions: document.getElementById('lifeline-actions'),
        lifelineMessage: document.getElementById('lifeline-message'),
        acceptLifeline: document.getElementById('accept-lifeline')
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const getQuestionsForLevel = (level) => {
        const levelQuestions = questions.filter(q => q.level === level);
        shuffleArray(levelQuestions);
        return levelQuestions.slice(0, 10);
    };

    let gameQuestions = [];

    const startGame = () => {
        gameState.currentQuestion = 0;
        gameState.score = 0;
        gameState.lifelinesUsed = { friend: false, audience: false, fiftyFifty: false, changeQuestion: false };
        gameState.fiftyFiftyUsed = false;
        gameState.lifelineUsedThisQuestion = false;
        gameQuestions = [
            ...getQuestionsForLevel(1),
            ...getQuestionsForLevel(2),
            ...getQuestionsForLevel(3)
        ];
        updateScore();
        updateLevel();
        elements.startScreen.classList.add('hidden');
        elements.endScreen.classList.add('hidden');
        elements.gameArea.classList.remove('hidden');
        playBackgroundMusic();
        nextQuestion();
    };

    const nextQuestion = () => {
        enableLifelines();
        if (gameState.currentQuestion >= gameQuestions.length) {
            endGame();
            return;
        }

        const question = gameQuestions[gameState.currentQuestion];
        elements.questionEl.textContent = question.question;
        elements.answersEl.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            elements.answersEl.appendChild(button);
        });

        resetTimer();
        elements.messageEl.textContent = '';
        enableLifelines();
        gameState.fiftyFiftyUsed = false;
        gameState.lifelineUsedThisQuestion = false;
    };

    const selectAnswer = (index) => {
        clearInterval(gameState.timer);
        const question = gameQuestions[gameState.currentQuestion];
        const buttons = elements.answersEl.getElementsByTagName('button');

        if (index === question.correct) {
            gameState.score += question.level * 1000;
            updateScore();
            buttons[index].classList.add('correct');
            elements.messageEl.textContent = '¡Correcto!';
            setTimeout(() => {
                if (confirm('¡Respuesta correcta! ¿Quieres continuar jugando?')) {
                    gameState.currentQuestion++;
                    updateLevel();
                    nextQuestion();
                } else {
                    endGame();
                }
            }, 1500);
        } else {
            buttons[index].classList.add('incorrect');
            buttons[question.correct].classList.add('correct');
            elements.messageEl.textContent = 'Incorrecto. La respuesta correcta era: ' + question.answers[question.correct];
            setTimeout(endGame, 2000);
        }

        Array.from(buttons).forEach(button => button.disabled = true);
    };

    const resetTimer = () => {
        clearInterval(gameState.timer);
        gameState.timeLeft = 45;
        elements.timerEl.textContent = gameState.timeLeft;
        gameState.timer = setInterval(() => {
            if (!gameState.isLifelineActive) {
                gameState.timeLeft--;
                elements.timerEl.textContent = gameState.timeLeft;
                if (gameState.timeLeft <= 0) {
                    clearInterval(gameState.timer);
                    elements.messageEl.textContent = '¡Se acabó el tiempo!';
                    endGame();
                }
            }
        }, 1000);
    };

    const updateScore = () => {
        elements.scoreEl.textContent = gameState.score;
    };

    const updateLevel = () => {
        elements.levelEl.textContent = gameState.currentQuestion < gameQuestions.length ? gameQuestions[gameState.currentQuestion].level : 3;
    };

    const endGame = () => {
        clearInterval(gameState.timer);
        elements.gameArea.classList.add('hidden');
        elements.endScreen.classList.remove('hidden');
        elements.finalScoreEl.textContent = `Tu puntuación final es: $${gameState.score}`;
        pauseBackgroundMusic();
    };

    const quitGame = () => {
        if (confirm('¿Estás seguro de que quieres retirarte?')) {
            endGame();
        }
    };

    const enableLifelines = () => {
        document.querySelectorAll('.lifeline').forEach(button => {
            const lifeline = button.id;
            button.disabled = gameState.lifelinesUsed[lifeline] || gameState.lifelineUsedThisQuestion;
        });
    };

    const useLifeline = (lifeline) => {
        if (gameState.lifelineUsedThisQuestion) {
            alert('Ya has usado un comodín en esta pregunta.');
            return;
        }

         // Verificar si el puntaje es mayor o igual a 300
    if (gameState.score >= 300) {
        gameState.lifelinesUsed[lifeline] = true;
        gameState.lifelineUsedThisQuestion = true;
        document.getElementById(lifeline).disabled = true;

        // Reducir el puntaje
        gameState.score = Math.max(0, gameState.score - LIFELINE_COST);
        updateScore();

        switch (lifeline) {
            case 'friend':
                gameState.timeLeft += 25; // Añadir 25 segundos al contador
                elements.timerEl.textContent = gameState.timeLeft; // Actualizar el contador en la interfaz
                break;
            case 'audience':
                gameState.isLifelineActive = true;
                elements.lifelineActions.classList.remove('hidden');
                break;
            case 'fifty-fifty':
                const buttons = elements.answersEl.getElementsByTagName('button');
                let eliminated = 0;
                for (let i = 0; i < buttons.length; i++) {
                    if (i !== gameQuestions[gameState.currentQuestion].correct && eliminated < 2) {
                        buttons[i].style.display = 'none';
                        eliminated++;
                    }
                }
                gameState.fiftyFiftyUsed = true;
                break;
            case 'change-question':
                gameState.currentQuestion++;
                if (gameState.currentQuestion >= gameQuestions.length) {
                    gameState.currentQuestion = 0;
                }
                nextQuestion();
                break;
        }

        enableLifelines(); // Deshabilitar los demás comodines después de usar uno
    } else {
        // Si el puntaje es menor a 300, mostrar un mensaje y no permitir usar el comodín
        alert('Debes tener al menos $300 para poder usar un comodín.');
    }
};

    const acceptLifeline = () => {
        gameState.isLifelineActive = false;
        elements.lifelineActions.classList.add('hidden');
        elements.lifelineMessage.textContent = '';
    };

    const playBackgroundMusic = () => {
        elements.audio.play().then(() => {
            elements.toggleAudioButton.textContent = '🔊';
        }).catch(error => {
            console.error("Error al intentar reproducir la música: ", error);
        });
    };

    const pauseBackgroundMusic = () => {
        elements.audio.pause();
        elements.toggleAudioButton.textContent = '🔇';
    };

    const toggleBackgroundMusic = () => {
        if (elements.audio.paused) {
            playBackgroundMusic();
        } else {
            pauseBackgroundMusic();
        }
    };

    // Event Listeners
    elements.startButton.addEventListener('click', startGame);
    elements.quitButton.addEventListener('click', quitGame);
    elements.playAgainButton.addEventListener('click', startGame);
    elements.toggleAudioButton.addEventListener('click', toggleBackgroundMusic);
    elements.acceptLifeline.addEventListener('click', acceptLifeline);

    document.querySelectorAll('.lifeline').forEach(button => {
        button.addEventListener('click', () => useLifeline(button.id));
    });
});