
// if luke = vader > chewie > r2d2
// if vader = luke > chewie > r2d2
// if r2d2 = chewie > vader > luke
// if chewie = r2d2 > vader > luke

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
		attack: 14,
		counter:16,
		health: 125,
		imgFile: "../images/r2d2.png"

	},
	obj4 = {
		name: "Chewie",
		attack: 19,
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
var wins = 0;

// Adds Hero's Stats to counters
function heroStats(hero){
	heroPower = $(hero).attr("attack");
	heroHealth = $(hero).attr("health");
	heroName = $(hero).attr("name");
	basePower = $(hero).attr("attack");
};

// Adds Enemy's Stats to counters
function enemyStats(enemy){
	enemyPower = $(enemy).attr("counter");
	enemyHealth = $(enemy).attr("health");
	enemyName = $(enemy).attr("name");
};

// Adds Hero's Name and Health to Battle Area
function heroNameHealth(hero){
	var addName =  $("<h4>").text(heroName);
	var addHealth = $("<h5 id='changeHeroHealth'>").text(heroHealth);
	$(".saviorArena").append(addName);
	$(".saviorArena").append(addHealth);
};

// Adds Enemy's Name and Health to Battle Area
function enemyNameHealth(enemy){
	var addName =  $("<h4>").text(enemyName);
	var addHealth = $("<h5 id='changeEnemyHealth'>").text(enemyHealth);
	$(".enemyArena").append(addName);
	$(".enemyArena").append(addHealth);
};

function chooseHero(hero) {
	$(hero).appendTo(".saviorArena");
	for (var i =0; i<idArray.length; i++) {
		if($(hero).is(idArray[i])) {
			$(hero).data(objArray[i]);
			heroStats(objArray[i]);
		}
	};

};

function chooseEnemy(enemy) {
	$(enemy).appendTo(".enemyArena");
	for (var i =0; i<idArray.length; i++) {
		if($(enemy).is(idArray[i])) {
			$(enemy).data(objArray[i]);
			enemyStats(objArray[i]);
		}
	};
};

// Updates health in battle area
function healthUpdate() {
	heroHealth = heroHealth - enemyPower;
	enemyHealth = enemyHealth - heroPower;
	heroPower = heroPower + basePower;
	$("#changeHeroHealth").replaceWith("<h5 id='changeHeroHealth'>Health: " + heroHealth + "</h5>");
	$("#changeEnemyHealth").replaceWith("<h5 id='changeEnemyHealth'>Health: " + enemyHealth + "</h5>");
	$("#battleInfo").html("<p>Enemy Attack did " + enemyPower + " damage. </p><p>Savior Attack did " + heroPower + " damage. </p>");
};

function enemyDies(){
	if(enemyHealth < 1 && heroHealth > 0 && wins < 2) {
	 	$(".enemyArena").find(".character").appendTo(".deadEnemies")
	 	$(".enemyArena").empty();
	 	$("#battleInfo").empty();
	 	isEnemyChoosen = false;
	 	enemyHealth = 0;
	 	wins++;
	 	$(".remaining").find(".character").appendTo(".initialChoice")
		$(".charPicking").css("visibility","visible");
	}
	else if((heroHealth < 1 && enemyHealth > 0) || (heroHealth < 1 && enemyHealth < 1 )) {
	 	$(".saviorArena").detach();
	 	$("#battleInfo").empty();
	 	$(".enemyArena").find(".character").appendTo("#battleInfo")
	 	$(".enemyArena").detach();
	 	$(".remaining").detach();
	 	$(".attackButton").replaceWith("<h2 class='loser'>You Lose!</h2>");	
	}
	else if(enemyHealth < 1 && heroHealth > 0 && wins >= 2) {
		$(".enemyArena").find(".character").appendTo(".initialChoice");
		$(".enemyArena").detach();
		$("#battleInfo").empty();
		$(".charPicking").hide();
		$(".saviorArena").find(".character").appendTo("#battleInfo")
		$(".saviorArena").detach();
		$(".attackButton").replaceWith("<h2 class='winner'>You Win!</h2>"); 
	 	$(".remainingTitle").replaceWith("<button class='btn btn-success newGame'>New Game?</button>");
	}
};

function startNewGame() {
	$(".charPicking").show();
	$(".charPicking").css("visibility","visible");
	wins = 0;
	console.log(wins);
	$("#battleInfo").find(".character").appendTo(".initialChoice");
	$(".deadEnemies").find(".character").appendTo(".initialChoice");
	
	isSaviorChoosen = false;
	isEnemyChoosen = false;
};


$(document).ready(function(){
	$(".character").on("click", function(){
		$(".deadEnemies").css("visibility","hidden");
		if(isSaviorChoosen === false) {
			chooseHero($(this));
			heroNameHealth($(this));
			isSaviorChoosen = true;

			$("h2").text(function () {
	    		return $(this).text().replace("Character", "Enemy"); 
	    	});
		}
		else if(isSaviorChoosen === true && isEnemyChoosen === false) {
			chooseEnemy($(this));
			enemyNameHealth($(this));
			isEnemyChoosen = true;

			// Puts remaining Enemy's in top box to choose from
			$(".initialChoice").find(".character").appendTo(".remaining")
			$(".charPicking").css("visibility","hidden");
		}
	});

	$(".attackButton").on("click", function(){
		healthUpdate();
		enemyDies();
	});

	$(".newGame").on("click", function(){
		// $(".charPicking").css("visibility","visible");
		// $(".deadEnemies").css("visibility","visible");
		// startNewGame();
		// $(".deadEnemies").find(".character").detach().append(".initialChoice");
		// $("#battleInfo").find(".character").detach().append(".initialChoice");
		wins = 0;
		console.log(wins);
	});
})













