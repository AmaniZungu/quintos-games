let pinkDonuts, posionDonuts;
let donuts;

function setup() {
	let donutBox = new Sprite(160.5, 250, 320, 300, 'static');
	donutBox.shape = 'chain';

	donuts = new Group();
	donuts.d = 29;
	donuts.bounciness = 1;
	donuts.friction = 0;
	donuts.rotationLock = true;

	pinkDonuts = new donuts.Group();
	pinkDonuts.img = 'pinkDonut.png';
	pinkDonuts.clicked = 0;

	while (pinkDonuts.length < 10) {
		let pinkDonut = new pinkDonuts.Sprite();
		pinkDonut.x = random(0, 320);
		pinkDonut.y = random(120, 400);
		pinkDonut.bounciness = 1;
	}

	posionDonuts = new donuts.Group();
	posionDonuts.img = 'poisonPinkdonut.png';

	while (posionDonuts.length < 14) {
		let posionDonut = new posionDonuts.Sprite();
		posionDonut.x = random(0, 320);
		posionDonut.y = random(120, 400);
		posionDonut.bounciness = 1;
	}

	for (let i = 0; i < donuts.length; i++) {
		donuts[i].direction = random(0, 360);
		donuts.speed = 1.2;
	}

	pinkDonuts.collided(posionDonuts, swapDonuts);
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
	d1.speed = 1.2;
	d2.speed = 1.2;
}

function draw() {
	clear();

	if (pinkDonuts.mouse.presses()) {
		log('clicked pink donut');
		pinkDonuts.clicked++;
	}

	if (posionDonuts.mouse.presses()) {
		log('clicked posion donut');
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
