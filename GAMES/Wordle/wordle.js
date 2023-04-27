let dictionary = [];
let commonWords = [];
let wordle;

async function setup() {
	/* load the text files*/
	let filePath = QuintOS.dir + '/dictionary5.txt';
	let data = await fetch(filePath);
	let lines = await data.text();

	lines = lines.split('\r\n');

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		line = line.split(' ');

		dictionary.push(...line);
	}
	log(dictionary);

	filePath = QuintOS.dir + '/words5.txt';
	data = await fetch(filePath);
	commonWords = await data.text();

	commonWords = commonWords.split('\r\n');
	//console.log(commonWords);

	let rand = Math.floor(Math.random() * commonWords.length);
	console.log(rand);
	wordle = commonWords[rand];
	console.log(wordle);

	startGame();
}

/* Display all the boxes for the letters */
function displayBoxes() {
	for (let i = 0; i < 5; i++) {
		for (let w = 0; w < 6; w++) {
			txtRect(2 + w * 3, 2 + i * 3, 3, 3);
		}
	}
}

async function startGame() {
	/* pick new word */

	displayBoxes();
	displayInfo();

	let guess;

	for (let g = 0; guess != wordle; g++) {
		guess = await prompt('Guess the word!', 3, 18, 20);
		guess = guess.toUpperCase();

		if (guess.length != 5) {
			await alert('The word must have five letters!', 3, 18, 20);
			g--;
			continue;
		}

		let correctLetters = [];

		let boxStyles = [];

		// loop through eac letter in the guess
		for (let i = 0; i < 5; i++) {
			let letter = guess[i];

			let style = 'solid';
			if (letter == wordle[i]) {
				style = 'dashed';
				correctLetters.push(letter);
			}
			boxStyles.push(style);
		}

		for (let i = 0; i < 5; i++) {
			let letter = guess[i];

			let style = boxStyles[i];

			if (wordle.includes(letter) && !correctLetters.includes(letter)) {
				style = 'outline';
			}

			let row = 3 + g * 3;
			let col = 3 + i * 3;

			log(style);

			await eraseRect(row - 1, col - 1, 3, 3);
			txt(letter, row, col);
			txtRect(row - 1, col - 1, 3, 3, style);
		}
	}
}

function displayInfo() {
	let row = 10;
	txtRect(row, 20, 3, 3, 'solid');
	txt('letter is not found in word', row, 24);
	row += 3;
	txtRect(row, 20, 3, 3, 'outline');
	txt('letter is in the word', row, 24);
	row += 3;
	txtRect(row, 20, 3, 3, 'dashed');
	txt('letter is in the correct position', row, 24, 14);
}

async function displayScore() {
	await eraseRect(9, 19, 20, 11);
	let str = score + '/' + total + ' correct\n\nGuess Distribution\n\n';
	for (let i = 0; i < 6; i++) {
		str += `Guess ${i + 1}: ${distribution[i]}\n`;
	}
	txt(str, 9, 19);
}
