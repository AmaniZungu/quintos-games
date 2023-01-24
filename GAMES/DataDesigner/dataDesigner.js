let table = `
| id | film title                      |
|====|=================================|
`;
// example film data

async function start() {
	let message;

	//await alert('Welcome To Sakhiles Moive Store!')

	//viewMember();
	//let option = await prompt('Do You Want To Rent A Film? (Yes/No)');
	//if (option.toU) message = await prompt('Type In Your Name and Id To Rent The Film');

	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	data = await data.json();
	let films = data.films;
	log(films);
	for (let film of films) {
		table += '| ' + film.id + ' | ' + film.title.padEnd(32, ' ') + '|\n';
		console.log(table);
	}
	text(table, 2, 0);
	let cmd = await prompt('0: Back, 1: View, 2: Delete', 20, 0, 40);
}

async function viewMember() {
	let filePath = QuintOS.dtr + '/members.json';
	let newData = await fetch(filePath);
	membersData = await newData.json();
	let member = newData.members;
	log(member);
	//(let member of members) {
	table += '| ' + film.id + ' | ' + film.title.padEnd(32, ' ') + '|\n';
	console.log(table);
}
//}

function viewFilmsInfo() {}

function exit() {}
