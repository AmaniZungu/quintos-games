let header = `
| id | film title                      |
|====|=================================|
`;

// example film data

let films, members;

async function start() {
	let filePath = QuintOS.dir + '/films.json';
	let data = await fetch(filePath);
	data = await data.json();
	films = data.films;
	log(films);

	filePath = QuintOS.dir + '/members.json';
	data = await fetch(filePath);
	data = await data.json();
	members = data.members;
	log(members);

	mainMenu();
}

async function mainMenu() {
	erase();
	let choice = await prompt(
		'Welcome To Sakhiles Movie Store!\n\n1. View a members info\n\n2. View a films info\n\n3. Exit',
		3,
		3,
		36
	);

	if (choice == 3) {
		exit();
		return;
	}

	if (typeof choice == 'number' || !choice.includes(' ')) {
		await alert('Invalid User Input. Please Try Again');
		mainMenu();
		return;
	}

	choice = choice.split(' ');
	log(choice);
	let id = choice[1];
	choice = choice[0];

	if (choice == 1) {
		viewMember(id);
	} else if (choice == 2) {
		await viewFilmInfo(id);
		mainMenu();
	} else {
		await alert('Invalid User Input. Please Try Again');
		mainMenu();
	}

	//viewMember();
	//let option = await prompt('Do You Want To Rent A Film? (Yes/No)');
	//if (option.toU) message = await prompt('Type In Your Name and Id To Rent The Film');
}

function getFilm(id) {
	let film;
	for (film of films) {
		if (film.id == id) {
			break;
		}
	}
	if (film.id != id) {
		return null;
	}

	return film;
}

async function viewFilmInfo(filmId) {
	let film = getFilm(filmId);
	if (film == null) {
		await alert('Invalid Film Id. Please Try Again');
		mainMenu();
		return;
	}

	log(film);

	await alert(
		'id: ' +
			film.id +
			'\n\ntitle: ' +
			film.title +
			'\n\ngenre: ' +
			film.genre +
			'\n\nrating: ' +
			film.rating +
			'\n\ndescription:\n\n' +
			film.description,
		2,
		0,
		40
	);
}

async function viewMember(memberId) {
	let member;
	for (member of members) {
		if (member.id == memberId) break;
	}
	if (member.id != memberId) {
		await alert('Invalid Member Id. Please Try Again');
		mainMenu();
		return;
	}

	log(member);
	text(member.id + ' ' + member.name, 2, 0);

	let table = header;

	let film;
	for (let film of films) {
		if (member.rented.includes(film.id)) {
			let title;
			if (film.title.length > 32) {
				title = film.title.slice(0, 29) + '...';
			} else {
				title = film.title.padEnd(32, ' ');
			}

			table += '| ' + film.id + ' | ' + title + '|\n';
		}
	}
	log(film);
	text(table, 4, 0);
	let choice = await prompt('0: Back, 1: View, 2: Rent, 3: Return', 20, 0, 40);
	erase();

	if (choice == 0) {
		mainMenu();
		return;
	}

	if (typeof choice == 'number' || !choice.includes(' ')) {
		await alert('Invalid User Input. Please Try Again');
		viewMember(memberId);
		return;
	}

	choice = choice.split(' ');
	log(choice);
	let id = choice[1];
	choice = choice[0];

	if (getFilm(id) != null) {
		if (choice == 1) {
			await viewFilmInfo(id);
		} else if (choice == 2) {
			member.rented.push(id);
		} else if (choice == 3) {
			let idx = member.rented.indexOf(id);
			member.rented.splice(idx, 1);
		} else {
			await alert('Invalid User Input. Please Try Again');
		}
	} else {
		await alert('Invalid Film Id. Please Try Again');
	}

	viewMember(memberId);
}

function exit() {}
