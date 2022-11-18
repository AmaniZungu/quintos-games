let time = 0;
let art = 0;

function draw() {
	if (art == 7) {
		background(0);
	} else if (art == 13) {
		background(0, 0, 0, 5);
	} else if (art == 11) {
		background(0, 0, 0, 10);
	} else if (art == 1 || art == 4 || art == 10 || art == 3) {
		background(0, 0, 0, 15);
	} else if (art == 12) {
		background(0, 0, 0, 20);
	} else if (art == 6 || art == 8) {
		background(0, 0, 0, 30);
	}

	stroke('w');

	// change the stroke width
	if (art == 4) {
		strokeWeight(10);
	} else if (art <= 6 || art == 13) {
		strokeWeight(4);
	} else {
		strokeWeight(1);
	}

	// change the origin
	if (art == 6) {
		translate(width / 2, 200);
	} else {
		translate(width / 2, height / 2);
	}

	// amount of points or lines drawn
	let amount = 10;

	if (art == 4) amount = 20;

	for (let i = 0; i < amount; i++) {
		// change the color of the lines
		if (art == 0) {
			if (i % 2 == 0) {
				stroke(255, 255, 0); //yellow
			} else {
				stroke(255, 255, 255); //white
			}
		} else if (art == 1) {
			stroke(255, 0, 0);
		} else if (art == 3) {
			stroke(80, 80, 255);
		} else if (art == 4) {
			let m = time % 500;
			if (time % 100 < 1) {
				background('b');
			}
			if (m < 100) {
				stroke('#ff1178');
			} else if (m < 200) {
				stroke('#fe0000');
			} else if (m < 300) {
				stroke('#fff205');
			} else if (m < 400) {
				stroke('#01fff4');
			} else if (m < 500) {
				stroke('#7cff01');
			}
		} else if (art == 5) {
			stroke(32, 91, 200);
		} else if (art == 6) {
			stroke(random(50, 255), random(100, 255), random(200, 255));
		} else if (art == 7) {
			stroke(time % 255, 77, 34);
		} else if (art == 8) {
			// sin/cos frequency colour swticher bloew
			stroke(cos(time * 10) * 255, cos(time * 5) * 255, cos(time * 10) * 100);
		} else if (art == 9) {
			// time shifted color
			//stroke(time % 255, 100, 100);
			stroke(time % 255, 200, 200);
		} else if (art == 10) {
			stroke(-sin(time * 14) * 79, cos(time * 15) * 5, cos(time * 16) * 79);
		} else if (art == 11) {
			stroke(sin(time * 5) * 15, sin(time * 9) * 255, sin(time * 19) * 37);
		} else if (art == 12) {
			stroke(random(39, 47), random(145, 239), random(17, 56));
		}

		if (art == 2 || art == 13) {
			for (let p = 0; p < 100; p++) {
				if (p % 2 == 0) {
					stroke(205, 20, 55);
				} else {
					stroke(30, 100, 235);
				}
				point(eqX(time / p) * p * 0.3, cos((time / p) * 4) * p * 18 + sin((time / p) * 5));
				//point(eqX((time / p) * 0.1) * p * 0.5, cos((time / p) * 4) * p * 40 + sin((time / p) * 5));
			}
		} else if (art == 3) {
			let m = round(time % 50) * 40;
			for (let g = 0; g < 20; g++) {
				point(eqX(time) - m + g * 40, eqY(time)); // right side
				point(eqX2(time) + m - g * 40, eqY2(time)); // left side
			}
		} else if (art <= 5) {
			point(eqX(time), eqY(time));
		} else if (art == 6) {
			for (let j = 0; j < 20; j++) {
				point(eqX(time), eqY(time) + j * 40);
				point(eqX(time + 25), eqY(time) + j * 40);
			}
		} else {
			line(eqX(time), eqY(time), eqX2(time), eqY2(time));
		}

		if (art == 0 || art == 1 || art == 6 || art == 7 || art == 9 || art == 10 || art == 11 || art == 12)
			point(eqX2(time), eqY2(time));

		// time increment
		if (art == 0) {
			time += 0.02;
		} else if (art == 7 || art == 2) {
			time += 0.5;
		} else if (art == 13) {
			time += 1.3;
		} else if (art == 3) {
			time += 0.05;
		} else {
			time += 0.1;
		}
	}

	if (kb.presses('ArrowLeft')) {
		background('b');
		art--;
	} else if (kb.presses('ArrowRight')) {
		background('b');
		art++;
	}
}

function eqX(t) {
	if (art == 0 || art == 7) return cos(t * 50) * 100 + cos(t * 5) * 500;
	if (art == 1 || art == 8) return -sin(t * 25) * 100 + -sin(t * 5) * 100;
	if (art == 2 || art == 13) return sin(t * 2) * 200 * cos(t);
	if (art == 3) return cos(t * 5) * 230 * -cos(t * 10);
	if (art == 4) return -cos(t * 2) * 500 * -sin(t);
	if (art == 5) return sin(t * 160) * 150;
	if (art == 6) return -sin(t * 6) * 500 - sin(t * 360);
	if (art == 9 || art == 10) return -sin(t * 180) * 150 - -sin(t * 250) * 80;
	if (art == 11) return cos(t * 60) * 100 * -sin(t * 50) * 234;
	if (art == 12) return -cos(t * 40) * 48;
}
function eqY(t) {
	if (art == 0 || art == 7) return cos(t * 5) * 100;
	if (art == 1 || art == 8) return sin(t * 50) * 250;
	if (art == 3) return cos(t * 5) * 383;
	if (art == 4) return -sin(t * 16) * 200;
	if (art == 5) return -sin(t * 88) * 200 * cos(t);
	if (art == 6) return -sin(t * 200) * 50;
	if (art == 9 || art == 10) return cos(t * 400) * 25;
	if (art == 11) return cos(t * 150) * 100;
	if (art == 12) return cos(t * 75) * 34 * cos(t * 10);
}

function eqX2(t) {
	if (art == 0 || art == 7) return cos(t * 50) * 200 + cos(t * 5) * 200;
	if (art == 1 || art == 8) return sin(t * 50) * 200 + cos(t * 2) * 200;
	if (art == 3) return sin(t * 10) * 230 * -sin(t * 5);
	if (art == 9 || art == 10) return -cos(t * 250) * 150 - -cos(t * 80) * 180;
	if (art == 11) return -sin(t * 5) * 10 + -sin(t * 13) * 200;
	if (art == 12) return sin(t * 21) * 462 - -cos(t * 26) * 200;
}
function eqY2(t) {
	if (art == 0 || art == 7) return cos(t * 5) * 100;
	if (art == 1 || art == 8) return sin(t * 50) * 60;
	if (art == 3) return cos(t * 5) * 383;
	if (art == 9 || art == 10) return sin(t * 25) * 400;
	if (art == 11) return cos(t * 82) * 4;
	if (art == 12) return -cos(t * 54) * 200 * -sin(t * 95) * 152;
}
