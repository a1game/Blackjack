let gameStarted = false;
let p1Money = 2500; // Initial money for player 1
let p2Money = 2500; // Initial money for player 2
let p1Number = 0; // Initial number for player 1
let p2Number = 0; // Initial number for player 2
let p1Bet = 0; // Player 1's bet
let p2Bet = 0; // Player 2's bet
let roundpulls = 0
function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0));
  }
function startGame() {
    let bet1Input = document.getElementById('bet1');
    p1Bet = parseInt(bet1Input.value);
    let bet2Input = document.getElementById('bet2');
    p2Bet = parseInt(bet2Input.value);

    if (p1Bet < 0 || p2Bet < 0) {
        alert('Please enter a valid bet amount');
        return;
    }


    if ((p1Money > p1Bet && p2Money > p2Bet) && (!gameStarted)) {
        gameStarted = true;
        document.getElementById('bet1').disabled = true;
        document.getElementById('bet2').disabled = true;
        document.getElementById('button1').disabled = false;
        document.getElementById('button2').disabled = false;
        p1pull(false)
        p2pull(false)
    }
    else {
        if (gameStarted) {
            alert('Game Already Running');
        }
        else {
        alert('Please enter a valid bet amount');
        }
    }
}


function p1HUN() {
    p1Money += 100;
    document.getElementById('value1').innerText = p1Number;
    document.getElementById('value2').innerText = p2Number;
    document.getElementById('money1').innerText = p1Money;
    document.getElementById('money2').innerText = p2Money;
}
function p2HUN() {
    p2Money += 100;
    document.getElementById('value1').innerText = p1Number;
    document.getElementById('value2').innerText = p2Number;
    document.getElementById('money1').innerText = p1Money;
    document.getElementById('money2').innerText = p2Money;
}

function endGame() {
    if (!gameStarted) return;

    // Determine the winner based on who is closest to 21 without going over
    let p1Diff = 21 - p1Number;
    let p2Diff = 21 - p2Number;
    let winner;
    if (p1Diff >= 0 && (p1Diff < p2Diff || p2Diff < 0)) {
        winner = 'Player 1';
        p1Money += + p2Bet;
        p2Money -= + p2Bet;
    } else if (p2Diff >= 0 && (p2Diff < p1Diff || p1Diff < 0)) {
        winner = 'Player 2';
        p2Money += p1Bet;
        p1Money -= p1Bet
    } else {
        winner = 'None';
        p1Money -= p1Bet;
        p2Money -= p2Bet;
    }

    // Reset game state
    gameStarted = false;
    p1Number = 0;
    p2Number = 0;
    p1Bet = 0;
    p2Bet = 0;

    // Update UI
    document.getElementById('bet1').disabled = false;
    document.getElementById('bet2').disabled = false;
    document.getElementById('button1').disabled = true;
    document.getElementById('button2').disabled = true;
    document.getElementById('value1').innerText = p1Number;
    document.getElementById('value2').innerText = p2Number;
    document.getElementById('money1').innerText = p1Money;
    document.getElementById('money2').innerText = p2Money;

    alert(`Winner: ${winner}`);
}

function p1pull(show) {
    if (!gameStarted) return;

    let number = Math.floor(Math.random() * 9) + 1;
    p1Number += number;

    let betInput = document.getElementById('bet1');
    p1Bet = parseInt(betInput.value);
    document.getElementById('value1').innerText = p1Number;
    document.getElementById('money1').innerText = p1Money;
    card(number,show)

    return number;
}

function p2pull(show) {
    if (!gameStarted) return;

    let number = Math.floor(Math.random() * 9) + 1;
    p2Number += number;

    let betInput = document.getElementById('bet2');
    p2Bet = parseInt(betInput.value);
    roundpulls += 1
    document.getElementById('value2').innerText = p2Number;
    document.getElementById('money2').innerText = p2Money;
    card(number,show)

    return number;
}

function card(img,bool) {
if (bool){
let number = img
 // Create a new card container element
 let cardContainer = document.createElement('div');
 cardContainer.classList.add('card-container');
 document.body.appendChild(cardContainer);

 // Create a new card image element inside the container
 let card = document.createElement('img');
 card.classList.add('card');
 card.src = `/Assets/${number}.png`;
 card.style.width = '200px'; // Set the width to make the card bigger
 card.style.height = 'auto'; // Maintain aspect ratio
 cardContainer.appendChild(card);

 // Animate the card
 card.style.transform = 'translateY(-100%) rotate(0deg)';
 setTimeout(() => {
     card.style.transition = 'transform 0.5s ease-out';
     card.style.transform = 'translateY(0) rotate(360deg)';
 }, 100);

 // Fall back down
 setTimeout(() => {
     card.style.transition = 'transform 0.5s ease-in';
     card.style.transform = 'translateY(100vh) rotate(720deg)';
     setTimeout(() => {
         document.body.removeChild(cardContainer);
     }, 500);
 }, 1500); // Delay removal to allow the card to fall down
}
}
