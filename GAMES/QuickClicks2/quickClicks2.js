let pinkDonuts, poisonDonuts;
let donuts;
let score;
let isPlaying = false;
let img;
let times;

let levelDifficulty;

async function setup() {
	for (let i = 0; i < 250; i++) {
		image(pinkDonuts.img, random(0, width), random(20, 75));
		image(poisonDonuts.img, random(0, width), random(325, 380));
		image(pinkDonuts.img, random(-10, 30), random(55, 380));
		image(poisonDonuts.img, random(260, 330), random(20, 330));
	}
	fill(0);
	rect(52, 90, 216, 255);
	noLoop();

	await alert(
		'Welcome to Homer Simpsons donut world!\n\nSome of the donuts Homer got are infected with radioactive waste!\n\nMake sure Homer eats the pink donuts and not the green ones.\n\nHomer is very hungry, so you better be quick!',
		7
	);

	diffOptions();
}

async function diffOptions() {
	background(0);
	push();
	scale(2);
	image(pinkDonuts.img, 100, 50);
	image(poisonDonuts.img, 120, 90);
	pop();

	levelDifficulty = await prompt(
		'Pick Your Level Difficulty!\n\n\nEasy: 1\n\n\nMedium: 2\n\n\nHard: 3\n\n\nVery Hard: 4\n\n\nInsane: 5\n\n',
		3,
		0,
		28
	);

	if (levelDifficulty < 1 || levelDifficulty > 5) {
		background(0);
		await alert('Inacurate Level Number.\n\nPlease Try Again', 10);
		diffOptions();
	} else {
		startGame();
	}
}

function startGame() {
	loop();
	score = 0;
	times = [];
	pinkDonuts.clicked = 0;

	let pinkDAmount;
	if (levelDifficulty == 1) pinkDAmount = 4;
	if (levelDifficulty == 1) donuts.speed = 0.8;

	if (levelDifficulty == 2) pinkDAmount = 6;
	if (levelDifficulty == 2) donuts.speed = 1;

	if (levelDifficulty == 3) pinkDAmount = 8;
	if (levelDifficulty == 3) donuts.speed = 1.2;

	if (levelDifficulty == 4) pinkDAmount = 10;
	if (levelDifficulty == 4) donuts.speed = 1.3;

	if (levelDifficulty == 5) pinkDAmount = 12;
	if (levelDifficulty == 5) donuts.speed = 1.5;

	while (pinkDonuts.length < pinkDAmount) {
		let pinkDonut = new pinkDonuts.Sprite();
		pinkDonut.x = random(37, 283);
		pinkDonut.y = random(124, 360);
	}

	poisonDonuts.clicked = 0;

	let poisonDAmount;
	if (levelDifficulty == 1) poisonDAmount = 8;
	if (levelDifficulty == 1) donuts.speed = 0.8;

	if (levelDifficulty == 2) poisonDAmount = 10;
	if (levelDifficulty == 2) donuts.speed = 1;

	if (levelDifficulty == 3) poisonDAmount = 12;
	if (levelDifficulty == 3) donuts.speed = 1.2;

	if (levelDifficulty == 4) poisonDAmount = 14;
	if (levelDifficulty == 4) donuts.speed = 1.3;

	if (levelDifficulty == 5) poisonDAmount = 16;
	if (levelDifficulty == 5) donuts.speed = 1.5;

	while (poisonDonuts.length < poisonDAmount) {
		let posionDonut = new poisonDonuts.Sprite();
		posionDonut.x = random(37, 283);
		posionDonut.y = random(124, 360);
	}

	for (let i = 0; i < donuts.length; i++) {
		donuts[i].direction = random(0, 360);
	}

	isPlaying = true;
}

function preload() {
	img = loadImage('donut_Box.png');

	let donutBox = new Sprite(160, 247, 247, 249, 'static');
	donutBox.shape = 'chain';
	donutBox.visible = false;

	donuts = new Group();
	donuts.d = 29;
	donuts.bounciness = 1;
	donuts.friction = 0;
	donuts.rotationLock = true;
	donuts.speed = 0;

	pinkDonuts = new donuts.Group();
	pinkDonuts.addAni('pinkDonut_bite0.png', 2);
	pinkDonuts.ani.stop();

	poisonDonuts = new donuts.Group();
	poisonDonuts.addAni('poisonPinkdonut_bite0.png', 1);
	poisonDonuts.ani.stop();

	pinkDonuts.collided(poisonDonuts, swapDonuts);
}

async function calcStats() {
	console.log(times);
	let speeds = [];

	let len = times.length - 1;

	for (let i = 0; i < len; i++) {
		speeds.push(times[1 + i] - times[i]);
	}

	console.log(speeds);

	let sum = 0;

	for (let i = 0; i < len; i++) {
		sum = speeds[i] + sum;
	}

	let avg = Math.round(sum / len);

	let slowest = speeds[0];
	let fastest = speeds[0];

	for (let i = 0; i < len; i++) {
		if (fastest > speeds[i]) {
			fastest = speeds[i];
		}
		if (slowest < speeds[i]) {
			slowest = speeds[i];
		}
	}

	isPlaying = false;
	donuts.removeAll();
	background('b');

	await alert(
		'You won!\n\nAll the pink donuts have been eaten.\n\nYour average click speed was: ' +
			avg +
			' ms\n\n' +
			'Your slowest click speed was: ' +
			Math.round(slowest) +
			' ms\n\n' +
			'Your fastest click speed was: ' +
			Math.round(fastest) +
			' ms',
		7
	);
	diffOptions();
}

async function youLose() {
	isPlaying = false;
	donuts.removeAll();
	background('b');

	await alert('Game Over!\n\nHomer ate too many green donuts.\n\nTry again!', 10);

	diffOptions();
}

function swapDonuts(d1, d2) {
	let d1x = d1.x;
	let d1y = d1.y;
	d1.x = d2.x;
	d1.y = d2.y;
	d2.x = d1x;
	d2.y = d1y;
	let d1D = d1.direction;
	d1.direction = d2.direction;
	d2.direction = d1D;
	d1.speed = donuts.speed;
	d2.speed = donuts.speed;
}

function draw() {
	if (!isPlaying) {
		return;
	}

	image(img, 0, 0);

	textSize(21);
	text('Score: ' + score, 50, 50);

	// textSize(21);
	// text('Time: ' + performance.now(), 50, 100);

	for (let i = 0; i < pinkDonuts.length; i++) {
		if (pinkDonuts[i].mouse.presses()) {
			log('clicked pink donut');
			times.push(performance.now());
			pinkDonuts.clicked++;
			if (pinkDonuts[i].ani.frame == 2) {
				pinkDonuts[i].remove();
				score += 3;
				donuts.speed += 0.1;
			} else {
				pinkDonuts[i].ani.nextFrame();
				score++;
			}
			if (pinkDonuts.length == 0) {
				calcStats();
			}
		}
	}

	for (let i = 0; i < poisonDonuts.length; i++) {
		if (poisonDonuts[i].mouse.presses()) {
			log('clicked posion donut');
			poisonDonuts.clicked++;
			if (poisonDonuts[i].ani.frame == 1) {
				poisonDonuts[i].remove();
				score -= 5;
			} else {
				poisonDonuts[i].ani.nextFrame();
				score -= 3;
			}
			if (poisonDonuts.clicked == 6) {
				youLose();
			}
		}
	}

	if (kb.pressing('space')) {
		allSprites.debug = true;
	} else {
		allSprites.debug = false;
	}
}

// pink donut downscale
// scale down: 25.5
// w: 29
// h: 39
