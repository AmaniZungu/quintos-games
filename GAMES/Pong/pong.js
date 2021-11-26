// screen width is 256, height is 192

let imgBall = spriteArt(`
..rrrr..
.rrrrrr.
rrbbbbrr
bbbwwbbb
bbbwwbbb
wwbbbbww
.wwwwww.
..wwww..`);

// the \n means new line
let imgPaddle = spriteArt('.bbbbbb.\nbbbbbbbb\n' + 'bbrrrrbb\n'.repeat(42) + 'bbbbbbbb\n.bbbbbb.');

/* PART A1: Make image for the wall */
let imgWall1 = spriteArt('bbbrrbbb'.repeat(4), 10);
let imgWall2 = spriteArt('bbbrrbbb'.repeat(4), 10);

// places a ball in center of the screen
let ball = createSprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;
ball.velocity.x = 1;
ball.velocity.y = -1;

/* PART A0: create two paddles, place on each end of the screen */
let paddleL = createSprite(imgPaddle);
let paddleR = createSprite(imgPaddle);

paddleL.x = 0;
paddleL.y = 80;
paddleL.immovable = true;

paddleR.x = 247;
paddleR.y = 80;
paddleR.immovable = true;

let wall1 = createSprite(imgWall1);
let wall2 = createSprite(imgWall2);

wall1.x = 0;
wall1.y = 10;

wall2.x = 0;
wall2.y = height - wall2.h;

function draw() {
	background(colorPal('u'));
	stroke(colorPal('w'));
	fill(colorPal('b'));
	strokeWeight(5);
	line(0, 0, width, height);
	line(width, 0, 0, height);
	rect(width / 2 - 10, height / 2 - 10, 20, 20);

	// if the top of the ball touches the bottom of the upper wall
	// or if the bottom of the ball touches the top of the lower wall
	if (ball.y <= wall1.y + wall1.h || ball.y + ball.h >= wall2.y) {
		ball.velocity.y = -ball.velocity.y; // invert ball's y velocity
		// if ball is already moving left, make it move left more
		// if ball is already moving right, make it move right more
		if (ball.velocity.x < 0) {
			ball.velocity.x -= 0.1;
		} else {
			ball.velocity.x += 0.1;
		}

		if (ball.velocity.y < 0) {
			ball.velocity.y -= 0.1;
		} else {
			ball.velocity.y += 0.1;
		}
	}

	// if the ball goes off screen, place it in the center again
	if (ball.x > 256 || ball.x < 0) {
		ball.x = width / 2;
		ball.y = height / 2;

		// coin flip, 50/50 chance
		if (Math.random() > 0.5) {
			ball.velocity.x = 1;
		} else {
			ball.velocity.x = -1;
		}
		if (Math.random() > 0.5) {
			ball.velocity.y = 1;
		} else {
			ball.velocity.y = -1;
		}
	}

	/* PART A2 move the paddles */
	paddleL.y = mouseY;
	paddleR.y = mouseY;

	ball.bounce(paddleL);
	ball.bounce(paddleR);

	drawSprites();
}
