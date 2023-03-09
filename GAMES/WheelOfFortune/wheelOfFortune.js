// the category is "Fun and Games"
let phrasesList =
	"Tourist-Friendly Destination|Skateboarding & Snowboarding|Underground Entertainment|Competitive Shuffleboard|Cookie-Decorating Contest|Grand-Opening Celebration|Multicultural Activities|Neighborhood Get-Together|Photography & Scrapbooking|Skateboards & Rollerblades|Snowball-Throwing Contest|Snowshoeing & Snowboarding|International Carnivals|Performing-Arts Festival|Skateboard & Rollerblades|Spur-Of-The-Moment Getaway|Unforgettable Carnivals|Wholesome Entertainment|Afterschool Activities|Arts-And-Crafts Festival|Disappearing-Coin Trick|Ice-Carving Competition|Mixologist Competition|Snowbiking & Airboarding|Big-Ticket Attractions|City-Center Horseraces|Halloween Festivities|Hamletscenen Festival|Helium-Filled Balloons|Lion-Dance Competition|Mountaineering & Skiing|Snowboarding & Sledding|Spontaneous Nightlife|Traditional Macaroons|Battleship Destroyer|Building Sandcastles|Carnival Attractions|Festive Celebrations|Fingerprint Drawings|Fingerprints Drawing|Gingerbread-House Kit|Going Paddleboarding|Handball & Racquetball|Helium-Filled Baloons|Curling Championship|In-The-Kitchen Puzzles|Jack-O'-Lantern Carving|Model-Airplane Racing|Renaissance Festival|Alpine Snowboarding|Charades & Pictionary|Contestant Searches|Cross-Country Skiing|Festive Celebration|Five-Gallon Stockpot|Freestyle Wrestling|Frisbee Competition|Interactive Puzzles|Marshmallow Animals|Mini-Golf Tournament|Murder-Mystery Party|Playing Racquetball|Rhythmic Gymnastics|Roller-Coaster Rides|Sled-Pulling Contest|Sleight-Of-Hand Magic|Yuletide Activities|Back-Road Bicycling|Balance-Beam Tricks|Complicated Puzzle|Computer Solitaire|Fast-Pitch Softball|Festive Activities|Freshwater Fishing|Gymnastics Routine|Outdoor Recreation|Playful Activities|Playing Backgammon|Playing Horseshoes|Playing Pictionary|Ski Mountaineering|Slight-Of-Hand Magic|Table Shuffleboard|Water-Balloon Fight|Water-Balloon Throw|Weeklong Festivals|Baseball & Softball|Chess Competition|Collectible Dolls|Crossword Puzzles|Cultural Festival|Equestrian Sports|Filmmaking Genius|Football & Baseball|Football Practice|Going Parasailing|Goldfish Scooping|Halloween Hayride|Hot-Air Ballooning|Indoor Volleyball|Jovial Sing-Alongs|Juggling Beanbags|Late-Night Hayride|Medieval Festival|Miniature Golfing|Playing Asteroids|Playing Badminton|Playing Hopscotch|Playing Paintball|Playing Solitaire|Playing Tic-Tac-Toe|Pothole Exploring|Riverside Camping|Softball & Baseball|Tag-Team Wrestling|Two-Story Carousel|Water-Balloon Toss|Wheelbarrow Races|Writing Limericks|Adventure Racing|Alphabet Magnets|Ballroom Dancing|Barbeque Bonanza|Beach Volleyball|Biggie Boardings|Childhood Heroes|Chinese Checkers|Christmas Crafts|Crossword Puzzle|Demolition Derby|Disappearing Ink|Doing Handstands|Double-Coin Trick|Dungeons & Dragons|Fantasy Football|Fraternity Prank|Freestyle Skiing|Fun Brainteasers|Going Spelunking|Gorgeous Fishing|Gorgeous Golfing|Habanos Festival|Headband Antlers|Hula Competition|Hula-Hoop Contest|Indoor Go-Carting|Indoor Go-Karting|Inflatable Slide|Interactive Toys|Japanese Archery|Juggling Oranges|Knock-Knock Jokes|Masquerade Balls|Narrated Cruises|Paper Snowflakes|Ping-Pong Paddles|Playing Checkers|Playing Dominoes|Playing Jeopardy|Playing Jeopardy!|Playing Kickball|Playing Lacrosse|Playing Monopoly|Playing Peekaboo|Playing Ping-Pong|Playing Scrabble|Popcorn Garlands|Potato-Sack Races|Renaissance Fair|Riding Piggyback|Shooting Marbles|Spitting Contest|Sprint-Car Racing|Street Carnivals|Swim-Up Blackjack|Twenty Questions|Ultimate Frisbee|Urban Spelunking|Volleyball Match|Wheelbarrow Race|Winter Carnivals|Amazing History|Amusement Rides|Anderlecht Fair|Balloon Animals|Big-Wave Surfing|Board-Game Night|Boggle & Scrabble|Boogie Boarding|Burping Contest|Classic Yahtzee|Community Chest|Confetti Cannon|Country Dancing|Cricket & Croquet|Croquet Mallets|Deep-Sea Fishing|Downhill Skiing|Downhill Slalom|Dragon-Boat Race|Exciting Rounds|Family Cookouts|Finger Painting|Gaelic Football";

/* Make an array of phrases, pick a random phrase, and split phrase into an array of words */
unfilteredPhrases = phrasesList.split('|');

// make a filtered array of phrases with only the pharses
// with words shorter than 12 characters long
let phrases = [];
// loop through all unfiltered phrases
for (let i = 0; i < unfilteredPhrases.length; i++) {
	let p = unfilteredPhrases[i].split(' '); // phrase
	let shouldBeIncluded = true;
	// loop through words in the phrase
	for (let j = 0; j < p.length; j++) {
		let word = p[j];
		if (word.length > 12) {
			shouldBeIncluded = false;
			break;
		}
	}
	if (shouldBeIncluded) phrases.push(unfilteredPhrases[i]);
}

let phrase, board;

function start() {
	let rand = Math.floor(Math.random() * phrases.length);

	phrase = phrases[rand];
	phrase = phrase.split(' ');
	log(phrase);

	/* Make a board array to represent the letters in the phrase */
	// phrase -> ['Community', 'Chest']
	// board -> [
	//   [' ', ' ', ' ', '', ' ', ' ', ' ', ' ', ' '],
	//   [' ', ' ', ' ', ' ', ' ']
	// ]

	board = [];
	for (let i = 0; i < phrase.length; i++) {
		board.push([]);
		let word = phrase[i];
		for (let j = 0; j < word.length; j++) {
			board[i].push(' ');
		}
	}
	log(board);

	displayBoxes();
	/* Create the buzzer button */
	button(bigBuzzer, 18, 5, buzz);
	addLetter();
}

/* Display all the boxes for the phrase */
function displayBoxes() {
	// loop through the words in the phrase
	for (let i = 0; i < phrase.length; i++) {
		let word = phrase[i];
		// loop through the letters in the word
		for (let j = 0; j < word.length; j++) {
			textRect(2 + 3 * i, 2 + 3 * j, 3, 3);
		}
	}
}

let bigBuzzer = `
|⎺|__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|`.slice(1);

function buzz() {}

// board -> [
//   ['C', ' ', 'm', 'm', 'u', ' ', 'i', ' ', 'y'],
//   [' ', 'h', ' ', ' ', 't']
// ]

// avail -> [[0,1], [0,5], [0,7], [1,0], [1,2], [1,3]]

/* Add a letter to a random empty box */
async function addLetter() {
	let avail = [];
	// loop through the words in the phrase
	for (let i = 0; i < phrase.length; i++) {
		let word = phrase[i];
		// loop through the letters in the word
		for (let j = 0; j < word.length; j++) {
			if (board[i][j] == ' ') {
				avail.push([i, j]);
			}
		}
	}

	log(avail);

	let letter = phrase[wordIdx][letterIdx];
	txt(letter, 3 + 3 * wordIdx, 3 + 3 * letterIdx);
	board[wordIdx][letterIdx] = letter;

	log(wordIdx + ':' + letterIdx + ' letter: ' + letter);
	log(board.join('\n'));

	await delay(1000);
	addLetter();
}
