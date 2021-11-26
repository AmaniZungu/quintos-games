const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC

TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC

TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

text(title, 5, 6);

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1);

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridRow = 3;
const gridCol = 26;

/* PART A: finish the grid of 9x8 spaces */
text('─'.repeat(26), gridRow + 7, gridCol);
text('─'.repeat(26), gridRow + 15, gridCol); // draw another horizontal line

text('│\n'.repeat(23), gridRow, gridCol + 8);
text('│\n'.repeat(23), gridRow, gridCol + 17); // draw another vertical line

// board stores the game data
// in a two dimensional array of spaces
let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

let turnX = Math.random() <= 0.5;
let scoreX = 0;
let scoreO = 0;

// returns true if the mark is a winner
// returns false if mark has not won
function checkForWinner(mark) {
	for (let i = 0; i < 3; i++) {
		// rows
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}
		// columns
		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}

	// cris cross
	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	}
	if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}
	return false;
}

// returns true is there was a draw
// returns false if there is not a draw
function checkForDraw() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			if (board[row][col] == ' ') {
				return false;
			}
		}
	}
	return true;
}

function startNewGame() {
	// clear the board 2d array
	// draw bigSpaces on all the buttons
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			board[row][col] = ' ';
			text(bigSpace, gridRow + row * 8, gridCol + col * 9);
		}
	}
	turnX = Math.random() <= 0.5;
}

async function takeTurn(row, col) {
	// if position on board is not empty
	if (board[row][col] != ' ') {
		await alert('That is an invalid opition', 22, 53, 26);
		return; // exit the function
	}

	let mark;
	if (turnX) {
		text(bigX, gridRow + row * 8, gridCol + col * 9);
		board[row][col] = 'x';
		mark = 'x';
	} else {
		text(bigO, gridRow + row * 8, gridCol + col * 9);
		board[row][col] = 'o';
		mark = 'o';
	}

	log(board[0].join('|') + '\n' + board[1].join('|') + '\n' + board[2].join('|'));

	if (checkForWinner(mark)) {
		await alert('Player ' + mark + ' you won!', 16, 53, 26);
		if (turnX) {
			scoreX++;
		} else {
			scoreO++;
		}
		displayScore();
		startNewGame();
	}

	if (checkForDraw()) {
		await alert('It looks like it is a tie', 12, 53, 26);
		startNewGame();
	}

	turnX = !turnX;
	displayTurn();
}

function displayTurn() {
	if (turnX) {
		text('Player X turn', 3, 53);
	} else {
		text('Player O turn', 3, 53);
	}
}

function displayScore() {
	text('Player X score: ' + scoreX, 5, 53);
	text('Player O score: ' + scoreO, 6, 53);
}

displayScore();
displayTurn();
/* PART A: Make the buttons in the grid */
// note the intervals! x += 9 and y += 8
for (let row = 0; row < 3; row++) {
	for (let col = 0; col < 3; col++) {
		button(bigSpace, gridRow + row * 8, gridCol + col * 9, () => {
			takeTurn(row, col);
		});
	}
}
