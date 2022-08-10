async function start() {
	// start your code below this line!

	let num = Math.random() * 100;
	num = Math.ceil(num);
	console.log(num);

	let guess;
	for (let turns = 0; guess != num; turns++) {
		if (turns >= 7) {
			await alert("You're out of guesses.");
			break;
		}

		guess = await prompt('Guess a number 1 to 100');

		if (guess < 1 || guess > 100) {
			await alert('Invaild guess.');
			turns--;
		} else if (guess > num) {
			await alert('Your guess is too high.');
		} else if (guess < num) {
			await alert('Your guess is too low.');
		} else {
			await alert('Your guess is correct.');
		}
	}

	exit(); // this function exits the game
}
