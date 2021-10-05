(async () => {
  // start your code below this line!

  let num = Math.random() * 100;
  num = Math.ceil(num);
  console.log(num);

  let guess;
  while (guess != num) {
    guess = await prompt("guess a number 1 to 100");

    if (guess > num) {
      await alert("your guess is too high");
    } else if (guess < num) {
      await alert("your guess is too low");
    } else {
      await alert("your guess is correct");
    }
  }

  exit(); // this function exits the game
})(); // end
