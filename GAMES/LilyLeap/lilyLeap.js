let frog, lilypads, bugs;

let score = 0;

let countDown = 10;

let time;

let bugPositions = [];

let isPlaying = false;

function preload() {
	frog = new Sprite();
	frog.addAni('frog_jump.png', { size: [32, 16], frames: 7 });
	lilypads = new Group();
	lilypads.addAni('lilypads.png', { size: [16, 16], frames: 12 });

	let bugImg = spriteArt(`
	0  
	00 00
	0 0 0`);
	bugs = new Group();
	bugs.addImg(bugImg);
}

async function setup() {
	world.gravity.y = 10;
	noStroke();

	frog.x = 16;
	frog.y = 83;
	frog.w = 10;
	frog.h = 8;
	frog.rotationLock = true;
	frog.ani.stop();
	frog.layer = 1;

	bugs.y = 83;

	lilypads.y = 90;
	lilypads.w = 10;
	lilypads.h = 2;
	lilypads.collider = 'static';
	lilypads.layer = 0;

	frog.overlaps(bugs, eatBug);

	makeLilyPads();
	makeBugs();

	await delay(500);

	await alert('Press the up arrow key to jump one lily pad. Press right arrow to jump two.', 2);
	isPlaying = true;
	time = Date.now();
}

function eatBug(frog, bug) {
	bug.remove();
	countDown += 2;
}

function makeLilyPads() {
	/* Part A: Use a loop to make more lily pads. */
	for (let i = 0, l = 1; i < 100; i++, l++) {
		let lily = new lilypads.Sprite();
		lily.x = 16 + i * 16;
		lily.ani.frame = round(random(0, 11));
		lily.ani.frameDelay = round(random(100, 140));

		if (l % 5 == 0) {
			bugPositions.push(16 + i * 16);
		}

		if (random() > 0.6) {
			i++;
		}
	}
}

function makeBugs() {
	for (let i = 0; i < bugPositions.length; i++) {
		let bug = new bugs.Sprite();
		bug.x = bugPositions[i];
	}
}

function draw() {
	background('0');
	fill('3');
	rect(0, 0, width, 90);

	if (!isPlaying) return;
	// if frog is on the ground
	if (frog.y >= 83 && frog.vel.y < 1) {
		frog.x = round(frog.x / 16) * 16;
		frog.ani.stop();
		frog.ani.frame = 0;

		// then it can jump
		if (kb.presses('ArrowUp')) {
			// little jump
			frog.velocity.y = -1.4;
			frog.velocity.x = 0.975;
			frog.ani.play();
			score += 1;
			text(score + ' '.repeat(5), 0, 17);
		} else if (kb.presses('ArrowRight')) {
			// BIG jump!
			frog.velocity.y = -2;
			frog.velocity.x = 1.355;
			frog.ani.play();
			score += 2;
			text(score + ' '.repeat(5), 0, 17);
		}
	}

	camera.x = frog.x + 64;

	// reset if the frog falls or if the countdown timer runs out
	if (frog.y > 300 || countDown < 0) {
		gameOver();
	}

	text(countDown + ' '.repeat(5), 17, 17);

	if (frameCount % 60 == 0) {
		countDown--;
	}
}

async function gameOver() {
	isPlaying = false;
	await alert('Game Over! Your score is: ' + score);
	frog.x = 16;
	frog.y = 83;
	score = 0;
	countDown = 10;
	bugs.removeAll();
	makeBugs();
	text(score + ' '.repeat(5), 0, 17);
	isPlaying = true;
}
