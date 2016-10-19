
// if luke = vader then chewie then r2d2
// if vader = luke then chewie then r2d2

var idArray = ["#luke", "#vader", "#r2d2", "#chewie"]

var objArray = [
	obj1 = {
		name: "Luke",
		attack: 6,
		counter: 12,
		health: 185,
		imgFile: "../images/luke.png"

	},
	obj2 = {
		name: "Vader",
		attack: 8,
		counter: 14,
		health: 153,
		imgFile: "../images/vader.png"

	},
	obj3 = {
		name: "R2D2",
		attack: 10,
		counter:16,
		health: 125,
		imgFile: "../images/r2d2.png"

	},
	obj4 = {
		name: "Chewie",
		attack: 12,
		counter: 18,
		health: 120,
		imgFile: "../images/chewie.png"

	}

]



var isSaviorChoosen = false;
var isEnemyChoosen = false;
var basePower;
var heroPower;
var heroHealth;
var heroName;
var enemyPower;
var enemyHealth;
var enemyName;

// Adds Hero's Stats to counters
function heroStats(a){
	heroPower = $(a).attr("attack");
	heroHealth = $(a).attr("health");
	heroName = $(a).attr("name");
	basePower = $(a).attr("attack");
};

// Adds Enemy's Stats to counters
function enemyStats(b){
	enemyPower = $(b).attr("counter");
	enemyHealth = $(b).attr("health");
};

// Adds Hero's Name and Health to Battle Area
function heroNameHealth(c){
	var addName =  $("<h4>");
	addName.text($(c).data('name'));
	var addHealth = $("<h5 id='changeHeroHealth'>");
	addHealth.text($(c).data('health'));
	$("#saviorArena").append(addName);
	$("#saviorArena").append(addHealth);
};

// Adds Enemy's Name and Health to Battle Area
function enemyNameHealth(d){
	var addName =  $("<h4>").text($(d).data('name'));
	var addHealth = $("<h5 id='changeEnemyHealth'>").text(enemyHealth);
	$("#enemyArena").append(addName);
	$("#enemyArena").append(addHealth);
};

// Updates health in battle area
function healthUpdate() {
	$("#changeHeroHealth").replaceWith("<h5 id='changeHeroHealth'>" + heroHealth + "</h5>");
	$("#changeEnemyHealth").replaceWith("<h5 id='changeEnemyHealth'>" + enemyHealth + "</h5>");
	$("#battleInfo").html("<p>Enemy Attack did " + enemyPower + " damage. </p><p>Savior Attack did " + heroPower + " damage. </p>");
};

$(document).ready(function(){

	$(".character").on("click", function(){
		
		if(isSaviorChoosen === false) {
			$(this).appendTo("#saviorArena");
			for (var i =0; i<idArray.length; i++) {
				if($(this).is(idArray[i])) {
					$(this).data(objArray[i]);
					heroStats(objArray[i]);
				}
			};

			heroNameHealth($(this));
			isSaviorChoosen = true;
			$("h2").text(function () {
	    		return $(this).text().replace("Character", "Enemy"); 
	    	});
		}

		else if(isSaviorChoosen === true && isEnemyChoosen === false) {
			$(this).appendTo("#enemyArena");
			for (var i =0; i<idArray.length; i++) {
				if($(this).is(idArray[i])) {
					$(this).data(objArray[i]);
					enemyStats(objArray[i]);
				}
			};

			enemyNameHealth($(this));
			isEnemyChoosen = true;

			// Puts remaining Enemy's in top box to choose from
			$(".initialChoice").find(".character").appendTo(".remaining")
			$("#charPicking").css("visibility","hidden");
		}

	});

	$("#attackButton").on("click", function(){
		heroHealth = heroHealth - enemyPower;
		enemyHealth = enemyHealth - heroPower;
		heroPower = heroPower + basePower;
		healthUpdate();

		 if(enemyHealth < 1 && heroHealth > 1) {
		 	$("#enemyArena").empty();
		 	isEnemyChoosen = false;
		 	$(".remaining").find(".character").appendTo(".initialChoice")
			$("#charPicking").css("visibility","visible");
		 }
	});

})













