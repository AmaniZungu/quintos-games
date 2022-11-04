async function start() {
	// your code goes here
	let dec = await prompt('Decimal to Binary');

	text(convert(dec), 0, 0);
}

function convert(decimal) {
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
