$(document).ready(function(){
	
	
	var initialPresenters = [
	  {fname: 'Kelly', lname: 'Askew', presented: false},
	  {fname: 'Allyson', lname: 'Brusstar', presented: false},
	  {fname: 'Tina', lname: 'Cuatto', presented: false},
	  {fname: 'English', lname: 'Edwards', presented: false},
	  {fname: 'Sheana', lname: 'Foster', presented: false},
	  {fname: 'Betsy', lname: 'Gottesman', presented: false},
	  {fname: 'Christina', lname: 'Kim', presented: false},
	  {fname: 'Jessica', lname: 'Klein', presented: false},
	  {fname: 'Tim', lname: 'Lowden', presented: false},
	  {fname: 'George', lname: 'Mocharko', presented: false},
	  {fname: 'Portia', lname: 'Noel', presented: false},
	  {fname: 'Derek', lname: 'Schwabe', presented: false},
	  {fname: 'Tyler', lname: 'Spence', presented: false},
	  {fname: 'Stephen', lname: 'Stathem', presented: false},
	  {fname: 'Dan', lname: 'Whiting', presented: false},
	  {fname: 'Clarke', lname: 'Williams', presented: false}
	];
	
	
	function getRandomFromArray(arr){
	
	  var it = Math.floor(Math.random() * arr.length);
	  console.log("returing " + it + "for array of length" + arr.length);
	  return it;
	  
	}
	
	
	
	var disp = $("#splitflap").splitflap({
			initial: "",
			glyphSet: (" " +  $.splitflap.alphabetic.toLocaleLowerCase()).split('')
			});
	
  $("#nextPerson").on("click", function(e){
		var next = getNextPerson();
		disp.splitflap("value", next);
  });

	function getNextPerson(){
		var presenters = localStorage.getItem('presenters');
		if(presenters && presenters.length > 0){
			presenters = JSON.parse(presenters);
		} else {
			presenters = initialPresenters;
		}
		
		var whoIsLeft = presenters.filter(function(presenter){return !presenter.presented});
		var nextIndex = getRandomFromArray(whoIsLeft);
		whoIsLeft[nextIndex].presented = true;
		var nextName = whoIsLeft[nextIndex]['fname'];
		nextName = padStr(nextName);
		disp.splitflap("value", nextName);
		localStorage.setItem('presenters', JSON.stringify(whoIsLeft));
		
	}
	
	
	function padStr(str, padTo, padChar){
			
		if(typeof padChar === 'undefined'){
			padChar = ' ';
		}
		
		if(typeof padTo === 'undefined'){
			padTo = 9;
		}
		var strLen = str.length;
		
		if(padTo <= strLen ){
			return str;
		}
		
		// Algorithm
		// The return string should always be padTo long
		// take the upper bound of the difference divided by two
		// that's what goes on the preferred side
		// the rest goes on the other side. THE END.
		var diff = padTo - strLen;
		var left = Math.ceil(diff / 2);
		var right = diff - left;
		return padChar.repeat(left) + str + padChar.repeat(right);
		

	}
	
	
	$('#resetIt').on('click', function(e){
		
		var sure = confirm("You sure?");	

		if(sure){
			localStorage.clear();
				disp.splitflap("value", "");
		}
		
	});

});