let table = `
| id | film title                      |
|====|=================================|
`;
// example film data

async function start() {
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
