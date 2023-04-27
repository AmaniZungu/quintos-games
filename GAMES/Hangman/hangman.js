const hangman = [
	`
  +---+
  |   |
      |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
	`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

const wordsList =
	'abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled funny gabby galaxy galvanize gazebo gizmo glow glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack lengths lucky luxury marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quip quiz quizzes razzmatazz rhythm scratch snazzy squawk staff strength stretch stronghold stymie subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie';

// the start function gets run when the game starts
async function start() {
	// your code goes here! below this line

	/* Part A: split the wordsList String into an array called words, then choose a random word */

	words = wordsList.split(' ');
	console.log(words);

	let random = Math.floor(Math.random() * words.length);
	console.log(random);

	let word = words[random];
	console.log(word);

	/* Part B1: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']

	let lines = [];

	for (let i = 0; i < word.length; i++) {
		lines.push('_');
	}
	console.log(lines);

	/* Part B2 and C: show the lines for the word below the hangman art */

	let guesses = [];
	let parts = 0;

	while (lines.includes('_') == true) {
		let guess = await prompt(hangman[parts] + '\n\n' + lines.join(' '));
		guesses.push(guess);

		//Gussing the letters

		let isCorrect = false;
		for (let i = 0; i < word.length; i++) {
			let letter = word[i];
			if (guess == letter) {
				lines[i] = guess;
				isCorrect = true;
			}
		}

		//Gussing for the whoe word

		if (guess == word) {
			break;
		}

		if (isCorrect == false) {
			parts++;
		}

		if (parts > hangman.length - 1) {
			await alert('No more guesses left!\n\nYou guessed: ' + guesses.join(', ') + '\n\nThe correct word was ' + word);
			break;
		}
	}

	if (parts <= hangman.length - 1) {
		await alert(
			'You guessed the right word!\n\nYou guessed: ' + guesses.join(', ') + '\n\nThe correct word was ' + word
		);
	}

	exit();
} // end of the start function
