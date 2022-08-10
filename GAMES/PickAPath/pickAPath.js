async function start() {
	// start of wrapper (I will explain how this works later)

	let choice = -1; // initialize choice to -1, user has not made any choice yet

	while (choice != null) {
		// while choice is not null (nothing)
		let msg = ''; // initialize message to empty string
		let opt = [];
		if (choice == -1) {
			/* PART A: Start your story! */
			msg =
				"On a peaceful summer night you're staying in your dad's old cabin in the woods. You just finished eating dinner. How would you like to spend the rest of your evening? \n\n\t" +
				'1: Watch tv\n\t' +
				'2: Read a book\n\t' +
				'3: Play a board game';
			opt = [1, 2, 3];
		} else if (choice == 1 || choice == 12) {
			/* PART A: continue the story */
			msg =
				'You are flipping through the channels to find what to watch. What do you want to watch?\n\n\t' +
				'4: Diners, Drive-Ins, and Dives\n\t' +
				'5: Scooby-doo';
			opt = [4, 5];
		} else if (choice == 2) {
			msg =
				'There is a masive pile of books in the guest bedroom, which one would you like to read?\n\n\t' +
				'6: The FANAF Chronicles\n\t' +
				'7: Everything Is Fine';
			opt = [6, 7];
		} else if (choice == 3 || choice == 10 || choice == 16) {
			msg =
				'You go to the attic and find some board games, you ask your two friends which game to play and they say you can choose.\n\n\t' +
				'8: Clue\n\t' +
				'9: Monopoly';
			opt = [8, 9];
		} else if (choice == 4 || choice == 5) {
			msg =
				"You're watching your show but then you hear a loud bang in the attic.\n\n\t" +
				'10: You go and check it out\n\t' +
				"11: You pretend you didn't hear it";
			opt = [10, 11];
		} else if (choice == 6 || choice == 7) {
			msg =
				"While you are reading your book the Tv turns on to a white static screen. You're startled but it's probably just old electric wiring in the house that caused it.\n\n\t" +
				'12: Keep the tv on and flip through the channels\n\t' +
				'13: Turn it off and continue reading';
			opt = [12, 13];
		} else if (choice == 8 || choice == 9) {
			msg =
				'You get the game you want and walk towards the attic ladder but it slams in front of you and the lights turn off.\n\n\t' +
				'14: You scream!\n\t' +
				'15: You tell your friends to stop messing with you!';
			opt = [14, 15];
		} else if (choice == 11 || choice == 13) {
			msg =
				"You hear footsteps in the attic. Maybe an animal got in there and can't find its way out!\n\n\t" +
				"16: Go to the attic to see what's in there.\n\t" +
				"17: Ignore it, it will probably get out on it's own.";
			opt = [16, 17];
		} else if (choice == 17) {
			msg =
				'An hour has passed, now you are trying to go to sleep but you still hear noises coming from the attic.\n\n\t' +
				"16: Go to the attic to see what's in there.";
			opt = [16];
		} else if (choice == 14 || choice == 15) {
			msg =
				'Your friends rush towards the attic stars and say "What is happeing in there? Are you alright?"\n\n\t' +
				'18: Try to open the attic ladder';
			opt = [18];
		} else if (choice == 18) {
			msg =
				"It's jammed! You can't open it and you're getting scared. You hear a deep cooled voice behind you saying \"I got you\" \n\n\t" +
				'19: You yank the attic ledder as hard as you can to get it open\n\t' +
				'20: Turn around when you hear the voice.';
			opt = [19, 20];
		} else if (choice == 19) {
			msg =
				'Cold and slimey fingers wrap around your neck and you scream.\n\n\t' +
				'21: You try and break free from the demons hands\n\t' +
				'22: You are paralyzed with fear so you are unable to move.';
			opt = [21, 22];
		} else if (choice == 21) {
			msg = 'As try has hard as you can to fight back against the demon. But the demon kills you in an instant.';
		} else if (choice == 20) {
			msg =
				'As you turn around to see what is behind you the unthinkable happens. The demon looks you in your eyes and kills you.';
		} else if (choice == 22) {
			msg =
				'The demon moves his hands to your head and possess you. Your mind goes blank and you see the demon in your mind.\n\n\t' +
				'25: You lunge at the demon trying to fight it out of you.\n\t' +
				'26: You succumb to the will of the demon and die.';
			opt = [25, 26];
		} else if (choice == 25) {
			msg =
				'The demon fully consumes your mind and you are left in a black void. Its all come to an end where there is nothing but darkness.  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------';
		}

		// .length gives us the amount of items in an array
		// if they can make choices opt.length will be
		// greater than zero
		if (opt.length > 0) {
			// prompt the player to make a choice
			let input = await prompt(msg);
			// so if the user did not cancel out of the prompt
			if (input != null) {
				// check if user made valid choice, meaning
				// it is one of the valid options in the opt array
				if (opt.includes(input)) {
					// actually change choice to user input
					// since the user made a valid choice
					choice = input;
				} else {
					// else the user made an invalid choice tell them
					await alert('You made an invalid choice!');
				}
			} else {
				choice = null;
			}
		} else {
			// else the user has no choice to make, just show
			// the message in an alert window
			await alert(msg);
			// change choice to null to exit the while loop
			// since choice must not be null for the loop to
			// keep looping
			/* PART B: end the game if there are no more choices to make */
			choice = null;
		}
	} // closing squiggly bracket of the while loop

	exit(); // exits the game
}
