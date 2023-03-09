async function start() {
	// your code goes here

	await alert('Num sys converter');
	await alert('Chose an option');
	await alert('B2D: Binary to Decimal');
	await alert('D2B: Decimal to Binary');
	let pick = await prompt('B2D or D2B?');

	if (pick == 'D2B') {
		let dec = await prompt('Decimal -> Binary');
		txt(convertD2B(dec), 0, 0);
	} else {
		let bi = await prompt('Binary -> Decimal');
		txt(convertB2D(bi), 0, 0);
	}
}

function convertD2B(decimal) {
	let binary = '';

	//	2^3 + 2^2 + 2^1 + 2^0 =
	// 8 + 4 + 2 + 1 = 15

	for (let i = 15; i >= 0; i--) {
		// 2 ** i
		let place = 2 ** i;
		if (decimal >= place) {
			binary += '1';
			decimal -= place;
		} else {
			binary += '0';
		}
	}

	log(binary);

	return binary;
}

function convertB2D(binary) {
	// convert number to string so the program
	// can got through it bit by bit
	binary = binary.toString();

	let deci = 0; // decimal starts at 0

	// for each bit in the binary number

	for (let i = 0; i < binary.length; i++) {
		// check if the bit is equal to one
		// then add 2 to the power of the place value
		if (binary[i] == 1) {
			deci += 2 ** (binary.length - 1 - i);
		}
	}
	log(deci);

	return deci;
}
