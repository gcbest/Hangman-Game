var word_options = ["dog", "car", "me", "alpha", "redman"];
var letters_guessed = [];
var wins = 0;
var guesses_remaining = 15;
var current_word = word_options[Math.round(Math.random() * (word_options.length - 1))];
var blanks = "";
var blanks_with_spaces = "";

function print_blanks() {
	for (i=0; i < current_word.length; i++) {
		blanks += "_";
	}
	console.log(blanks);
	return blanks;	
}

function addSpaces(str) {
	//create an array of the blanks
	var with_spaces = str.split("");
	
	//traverse the array and push to the array a space at the odd indices
	for (var i=1; i < with_spaces.length; i+=2) {
		with_spaces.splice(i, 0, " ");
	}
	
	//set the array to point to itself with the spaces now added
	with_spaces = with_spaces;
	console.log(with_spaces);
	//rejoin the array into a string
	var new_string = with_spaces.join("");
	
	//output to the screen
	document.querySelector('#word_now').innerHTML = new_string;

}
function replaceString(str,char) {
  //str is the blanks string, char is the current_guess
 
  //split up the blanks string
  var blanks_array = str.split("");
  console.log(blanks_array);
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
  console.log("This is the blanks now the array " + blanks_array);
  //update the blanks_array so that it points to array with the newly inserted chars
  blanks_array = blanks_array;

  //rejoin the blanks into string
  blanks = blanks_array.join("");
  console.log("This is the new string " + blanks);
}


function play() {
	print_blanks();
	addSpaces(blanks);
	document.querySelector("#guess_count").innerHTML = guesses_remaining;
	document.querySelector("#letters_guessed").innerHTML = letters_guessed;
	// addSpaces(blanks);
	console.log(current_word);
	document.onkeyup = function() {
		
		var current_guess = String.fromCharCode(event.keyCode).toLowerCase();
		
		if (guesses_remaining > 1) {
			if (current_word.indexOf(current_guess) > -1) {
				var blanks2 = replaceString(blanks, current_guess);
				addSpaces(blanks);
			}

			if (blanks.indexOf("_") < 0) {
				wins++;
				guesses_remaining = 15;
				letters_guessed = [];
				blanks = "";
				document.querySelector("#win_total").innerHTML = wins;
				current_word = word_options[Math.round(Math.random() * (word_options.length - 1))];
				/* 
				OutPut A Winner PAGE!!!!
				The Last word was Car etc. Image of car
				*/
				play();
			}
			

			// PRETTIFY letters guessed output
			
			else {
				if (letters_guessed.indexOf(current_guess) < 0 && blanks.indexOf(current_guess) < 0) {
					letters_guessed.push(current_guess);
					guesses_remaining--;
					console.log(guesses_remaining);
					document.querySelector("#guess_count").innerHTML = guesses_remaining;
					document.querySelector("#letters_guessed").innerHTML = letters_guessed;
				}
			}
		}

		else {
			guesses_remaining = 15;
			letters_guessed = [];
			blanks = "";
			current_word = word_options[Math.round(Math.random() * (word_options.length - 1))];
			play();

		}		
	}	
}

play();

