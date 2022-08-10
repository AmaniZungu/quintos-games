// https://codepen.io/amanizungu/full/dyzXZyN

const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `.slice(1);
// slice removes the first character from the string
// in this case I remove the new line at the beginning
// so the first line of the button will be at the proper
// y value

// screen size is 80w x 30h
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 80 screen width - 8 target width - 1 frame line = 71
// 30 screen height - 6 target height - 1 frame line = 23

let btn;
let times = [];

async function makeBackground() {
	let patternA = '|⎽⎽/⎺⎺|o|⎽⎽/⎺'.repeat(6);
	let patternB = '|⎽⎽/⎺|0|⎽⎽/⎺⎺'.repeat(6);
	for (let i = 1; i < 29; i++) {
		if (i % 2 == 0) {
			await text(patternA, 1, i);
		} else {
			await text(patternB, 1, i);
		}
	}
}

async function btnClick() {
	times.push(Date.now());

	if (btn) {
		btn.erase();
		await makeBackground();
	}

	if (times.length >= 10) {
		console.log(times);
		let speeds = [];

		for (let i = 0; i < 9; i++) {
			speeds.push(times[1 + i] - times[i]);
		}

		console.log(speeds);

		let sum = 0;

		for (let i = 0; i < 9; i++) {
			sum = speeds[i] + sum;
		}

		let avg = Math.round(sum / 9);

		let slowest = speeds[0];
		let fastest = speeds[0];

		for (let i = 0; i < 9; i++) {
			if (fastest > speeds[i]) {
				fastest = speeds[i];
			}
			if (slowest < speeds[i]) {
				slowest = speeds[i];
			}
		}

		await alert(
			'Your average speed was: ' +
				avg +
				'ms\n' +
				'Your slowest speed was: ' +
				slowest +
				'ms\n' +
				'Your fastest speed was: ' +
				fastest +
				'ms'
		);
	} else {
		/* PART A: change the values of x and y to be random */
		let row = round(random(0, 23));
		let col = round(random(0, 71));
		/* PART B: Use recursion to make a new button after clicking a button */
		btn = button(target, row, col, btnClick);
	}
}

async function start() {
	await makeBackground();
	await alert(
		'Welcome to QuickClicks!\n\n To play the game is very simple,\n\n You just have to click on the target as fast as you can!'
	);
	await makeBackground();
	btnClick();
}

/* PART C: Limit clicks to 20, calculate stats */

/* PART D: Make a background pattern */
