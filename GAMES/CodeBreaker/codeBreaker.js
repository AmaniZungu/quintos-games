let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

async function start() {
	let message;

	let option = await prompt('Do you want to load a textfile? (yes/no)');
	if (option.toLowerCase() == 'yes') {
		let filePath = QuintOS.dir + '/secrets.txt';
		let data = await fetch(filePath);
		message = await data.txt();
	} else {
		message = await prompt('Type The Message You Want To Decode or Encode');
	}

	message = message.toUpperCase();

	let knowledge = await prompt('Do you know the shift value you want? (yes/no)?');
	knowledge = knowledge.toUpperCase();

	if (knowledge.toLowerCase() == 'yes') {
		let shift = await prompt('What is the encryption key or shift value you want to use?');
		for (let j = 0; j < alphabet.length; j++) {
			let alpha = alphabet[j];
			if (shift == alpha) {
				shift = j;
			}
		}
		await alert(ceasarCipher(message, shift));
	} else {
		for (let g = 1; g <= 25; g++) {
			let txt = message.slice(0, 70);
			txt = ceasarCipher(txt, g) + '...';
			button(txt, g, 1, () => {
				erase();
				alert(ceasarCipher(message, g) + '\nKey: ' + g);
			});
		}
	}
}

function ceasarCipher(message, shift) {
	let secret = '';
	// loop through the letters in the message string
	for (let i = 0; i < message.length; i++) {
		let character = message[i];

		let isLetter = false;
		log(character);

		// find the position of the letter in the alphabet
		for (let j = 0; j < alphabet.length; j++) {
			let alpha = alphabet[j];
			if (character == alpha) {
				let index = j + shift;
				if (index > 25) {
					index = index - 26;
				}
				if (index < 0) {
					index = index + 26;
				}

				secret += alphabet[index];
				isLetter = true;
			}
		}
		if (!isLetter) {
			secret += character;
		}
	}
	return secret;
}
