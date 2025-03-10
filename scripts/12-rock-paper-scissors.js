const score = JSON.parse(localStorage.getItem("score")) ||{
    wins : 0,
    ties : 0,
    losses : 0
}


document.querySelector('.js-rock-btn').addEventListener('click',()=>{
    playGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click',()=>{
    playGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click',()=>{
    playGame('scissors');
});

document.querySelector('.js-reset').addEventListener('click',()=>{
    // resetScore();
    showConfirm();
})

let isAutoplaying = false;
let intervalId;

document.querySelector('.js-autoplay').addEventListener('click',()=>{
    autoPlay();
});


function autoPlay(){
    if (!isAutoplaying){
        intervalId = setInterval(()=>{
            const playerMove = computerPlay();
            playGame(playerMove);
        },1000);
        isAutoplaying = true;
        document.querySelector('.js-autoplay').innerHTML = 'Stop playing';
    }else{
        clearInterval(intervalId);
        isAutoplaying = false;
        document.querySelector('.js-autoplay').innerHTML = 'Auto Play';
    }
}


document.body.addEventListener('keydown',(event)=>{
    if (event.key === 'r'){
        playGame('rock');
    } else if(event.key === 'p'){
        playGame('paper');
    } else if(event.key === 's'){
        playGame('scissors');
    }else if(event.key === 'a'){
        autoPlay();
    }else if(event.key === 'Backspace'){
        // resetScore();
        showConfirm();
    }
});

function playGame(playerMove){
    const computerMove = computerPlay();
    if (playerMove === computerMove){
        score.ties++;
        if(playerMove === 'rock'){
            const movesElement = document.querySelector('.js-moves');
            movesElement.innerHTML = `Your Move : 
            <button class="result">
            <img src="images/rock-emoji.png">
            </button>
            Computer's Move : 
            <button class="result">
            <img src="images/rock-emoji.png">
            </button>`;
        } else if (playerMove === 'paper'){
            const movesElement = document.querySelector('.js-moves');
            movesElement.innerHTML = `Your Move : 
            <button class="result">
            <img src="images/paper-emoji.png">
            </button>
            Computer's Move : 
            <button class="result">
            <img src="images/paper-emoji.png">
            </button>`;
        } else if(playerMove === 'scissors'){
            const movesElement = document.querySelector('.js-moves');
            movesElement.innerHTML = `Your Move : 
            <button class="result">
            <img src="images/scissors-emoji.png">
            </button>
            Computer's Move : 
            <button class="result">
            <img src="images/scissors-emoji.png">
            </button>`;
        }
        storeScore(score);
        displayMessage('ties');
        
    }
    else if (playerMove==='rock' && computerMove==='scissors'){
        score.wins++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/rock-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/scissors-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('wins');
        
    }
    else if(playerMove==='rock' && computerMove==='paper'){
        score.losses++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/rock-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/paper-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('losses');
        
    }
    else if(playerMove==='paper' && computerMove ==='rock'){
        score.wins++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/paper-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/rock-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('wins');

    }
    else if(playerMove==='paper' && computerMove==='scissors'){
        score.losses++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/paper-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/scissors-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('losses');

    }
    else if(playerMove==='scissors' && computerMove==='rock'){
        score.losses++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/scissors-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/rock-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('losses');

    }
    else if(playerMove==='scissors' && computerMove==='paper'){
        score.wins++;
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `Your Move : 
        <button class="result">
        <img src="images/scissors-emoji.png">
        </button>
        Computer's Move : 
        <button class="result">
        <img src="images/paper-emoji.png">
        </button>`;
        storeScore(score);
        displayMessage('wins');

    } else{
        const movesElement = document.querySelector('.js-moves');
        movesElement.innerHTML = `<p>Hit the buttons to start playing!</p>`;
        storeScore(score);
        displayMessage('wins');
    }
}


function computerPlay(){
    let randomNumber = Math.random();
    let choice;

    if(randomNumber < 0.33){
        choice = "rock";
    } else if(randomNumber < 0.66){
        choice = "paper";
    } else{
        choice = "scissors";
    }
    return choice;
}


function displayMessage(message){
    resultElement = document.querySelector('.js-result');
    scoreElement = document.querySelector('.js-score');
    if(message === 'wins'){
        resultElement.innerHTML = 'You win ! Computer lose!';
        scoreElement.innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
    }
    else if(message === 'losses'){
        resultElement.innerHTML = 'You lose ! Computer wins!';
        scoreElement.innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
    }
    else if(message === 'ties'){
        resultElement.innerHTML = 'Its a tie!';
        scoreElement.innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
    } else{
        resultElement.innerHTML = 'Game reset!';
        scoreElement.innerHTML = `Wins : ${score.wins}, Losses : ${score.losses}, Ties : ${score.ties}`;
    }
}


function storeScore(score){
    localStorage.setItem("score",JSON.stringify(score));
}

function resetScore(){
    score.wins=0;
    score.ties=0;
    score.losses=0;
    displayMessage(score);
    playGame('playerMove');
    localStorage.removeItem("score");
}

function showConfirm(){
    document.querySelector('.js-confirm').innerHTML=`
    Are you sure you want to reset the score? 
    <button class="confirm-btn js-yes">Yes</button>
    <button class="confirm-btn js-no">No</button>
    `;

    document.querySelector('.js-yes').addEventListener('click',()=>{
        resetScore();
        hideShowConfirm();
    });
    
    document.querySelector('.js-no').addEventListener('click',()=>{
        hideShowConfirm();
    });
}


function hideShowConfirm(){
    document.querySelector('.js-confirm').innerHTML = '';
}