var word_options = ["petra", "christ", "great", "machu", "colosseum", "chichen", "taj"];

var winning_pics = [
				'<img src="assets/images/petra.jpg" alt="petra">',
				'<img src="assets/images/christ.jpg" alt="christ">',
				'<img src="assets/images/great.jpg" alt="great">',
				'<img src="assets/images/machu.jpg" alt="machu">',
				'<img src="assets/images/colosseum.jpg" alt="colosseum">',
				'<img src="assets/images/chichen.jpg" alt="chichen">',
				'<img src="assets/images/taj.jpg" alt="taj">'
			];

var wonder = [
			"Petra", 
			"Christ the Redeemer", 
			"Great Wall of China",
			"Machu Pichu",
			"The Colosseum",
			"Chichen Itza",
			"Taj Mahal"
		];


var letters_guessed = [];
var wins = 0;
var guesses_remaining = 15;
var random_index = Math.round(Math.random() * (word_options.length - 1));
var current_word = word_options[random_index];
var current_pic = winning_pics[random_index];
var blanks = "";
var blanks_with_spaces = "";


function print_blanks() {
	for (i=0; i < current_word.length; i++) {
		blanks += "_";
	}
	return blanks;	
}

function addSpaces(str) {
	//create an array of the blanks
	var with_spaces = str.split("");
	
	//traverse the array and add to the array a space at the odd indices
	for (var i=1; i < with_spaces.length; i+=2) {
		with_spaces.splice(i, 0, " ");
	}
	
	//set the array to point to itself with the spaces now added
	with_spaces = with_spaces;
	//rejoin the array into a string
	var new_string = with_spaces.join("");
	
	//output to the screen
	document.querySelector('#word_now').innerHTML = new_string;

}
function replaceString(str,char) {
  //str is the blanks string, char is the current_guess
 
  //split up the blanks string
  var blanks_array = str.split("");
  //split up the current_word string
  var word_array = current_word.split("");
  /*
  traverse current word array and find index of every character that matches current guess, 
  set blanks_array at that index equal to that character
  */
  for (i=0; i < word_array.length; i++) {
  	if (word_array[i] === char) {
  		blanks_array[i] = char;
  	}

  }
  //update the blanks_array so that it points to array with the newly inserted chars
  blanks_array = blanks_array;

  //rejoin the blanks into string
  blanks = blanks_array.join("");
}

function play() {
	print_blanks();
	addSpaces(blanks);
	document.querySelector("#guess_count").innerHTML = guesses_remaining;
	document.querySelector("#letters_guessed").innerHTML = letters_guessed;
	// addSpaces(blanks);
	document.onkeyup = function() {
		
		var current_guess = String.fromCharCode(event.keyCode).toLowerCase();
		

		if (guesses_remaining > 1) {
			if (current_word.indexOf(current_guess) > -1) {
				replaceString(blanks, current_guess);
				addSpaces(blanks);
			}

			//No more blanks left, therefore user wins
			if (blanks.indexOf("_") < 0) {
				wins++;
				guesses_remaining = 15;
				letters_guessed = [];
				blanks = "";
				$('#wonder_name').html(wonder[random_index]);
				$('#winner_pic').html(winning_pics[random_index]);
				alert("You got it! The word was " + current_word);
				
				document.querySelector("#win_total").innerHTML = wins;
				random_index = Math.round(Math.random() * (word_options.length - 1));
				current_word = word_options[random_index];
				play();
			}
			

			else {
				if (letters_guessed.indexOf(current_guess) < 0 && blanks.indexOf(current_guess) < 0) {
					letters_guessed.push(current_guess);
					guesses_remaining--;
					document.querySelector("#guess_count").innerHTML = guesses_remaining;
					document.querySelector("#letters_guessed").innerHTML = letters_guessed;
				}
			}
		}

		else {
			alert("Womp Womp.....Let's try a new word");
			guesses_remaining = 15;
			winning = 
			letters_guessed = [];
			blanks = "";
			current_word = word_options[random_index];
			play();
		}		
	}	
}
			
	

play();

