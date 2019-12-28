/* GAME FUNCTION:
- Player must gess a number  between a min and max
- Player gets a certain amount of guesses
- Notify playe of guesses remaining
- Notify the player of the correct answer if they loose
- Let player choose to play again
*/

//Game values
let min = 2,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assige UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', function(e){
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }else{
    setMessage('');
  }

  //Check if won
  if(guess === winningNum){
    //disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = 'green';
    //set message
    setMessage(`${winningNum} is correct, YOU WIN`,'green');
  }else{

  }

  console.log(guess);
  console.log(message.textContent);
})


//SetMessage function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}