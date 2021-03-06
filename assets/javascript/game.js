
// if luke = vader > chewie > r2d2
// if vader = luke > chewie > r2d2
// if r2d2 = luke > chewie > vader
// if chewie = r2d2 > vader > luke

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
var campaignsWon = 0;
var campaignsLost = 0;

var characterNameArray = ["#luke", "#vader", "#r2d2", "#chewie"];

var characterStatArray = [
	{
		name: "Luke",
		attack: 6,
		counter: 12,
		health: 185,
	},
	{
		name: "Vader",
		attack: 8,
		counter: 14,
		health: 153,
	},
	{
		name: "R2D2",
		attack: 15,
		counter:16,
		health: 125,
	},
	{
		name: "Chewie",
		attack: 16,
		counter: 18,
		health: 120,
	}

];

function chooseHero(hero) {
	$(hero).appendTo(".saviorArena");
	for (var i =0; i<characterNameArray.length; i++) {
		if($(hero).is(characterNameArray[i])) {
			$(hero).data(characterStatArray[i]);
			heroStats(characterStatArray[i]);
		}
	};

};

function chooseEnemy(enemy) {
	$(enemy).appendTo(".enemyArena");
	for (var i =0; i<characterNameArray.length; i++) {
		if($(enemy).is(characterNameArray[i])) {
			$(enemy).data(characterStatArray[i]);
			enemyStats(characterStatArray[i]);
		}
	};
};

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

// Updates health in battle area
function healthUpdate() {
	heroHealth = heroHealth - enemyPower;
	enemyHealth = enemyHealth - heroPower;
	heroPower = heroPower + basePower;
	$("#changeHeroHealth").replaceWith("<h5 id='changeHeroHealth'>Health: " + heroHealth + "</h5>");
	$("#changeEnemyHealth").replaceWith("<h5 id='changeEnemyHealth'>Health: " + enemyHealth + "</h5>");
	$("#battleInfo").html("<p>Enemy Attack did " + enemyPower + " damage. </p><p>Savior Attack did " + heroPower + " damage. </p>");
};

function campaignUpdate() {
	$(".campaignTally").show();
	$(".campaignTally").html("<p>Campaigns Won:  " + campaignsWon + "</p><p>Campaigns Lost: " + campaignsLost + "</p>");
};

function enemyDies(){

	// When player defeats the first 2 enemies
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

	// When player loses game
	else if((heroHealth < 1 && enemyHealth > 0) || (heroHealth < 1 && enemyHealth < 1 )) {
	 	$(".saviorArena").find(".character").appendTo(".deadEnemies");
	 	$(".saviorArena").empty();
	 	$("#battleInfo").empty();
	 	$(".enemyArena").find(".character").appendTo("#battleInfo")
	 	$(".enemyArena").empty();
	 	$(".remainingTitle").hide();
	 	$(".loser").show();
	 	$(".attackButton").hide();
	 	$(".newGame").show();
	 	campaignsLost++;
	 	campaignUpdate();
	}

	// When player wins game
	else if(enemyHealth < 1 && heroHealth > 0 && wins >= 2) {
		$(".enemyArena").find(".character").appendTo(".deadEnemies");
		$(".enemyArena").empty();
		$("#battleInfo").empty();
		$(".saviorArena").find(".character").appendTo("#battleInfo");
		$(".saviorArena").empty();
		$(".remainingTitle").hide();
		$(".winner").show();
		$(".attackButton").hide();
	 	$(".newGame").show();
	 	campaignsWon++;
	 	campaignUpdate();
	}
};

function initialButtonState () {
	$(".newGame").hide();
	$(".winner").hide();
	$(".loser").hide();
	$(".attackButton").hide();
	$(".campaignTally").hide();
	$(".remainingTitle").show();
};

function startNewGame() {
	$(".charPicking").show();
	$(".charPicking").css("visibility","visible");
	$("#battleInfo").find(".character").appendTo(".initialChoice");
	$(".deadEnemies").find(".character").appendTo(".initialChoice");
	initialButtonState();
	isSaviorChoosen = false;
	isEnemyChoosen = false;
	wins = 0;
	enemyHealth;
	heroHealth;
};

$(document).ready(function(){
	initialButtonState();

	$(".character").on("click", function(){
		initialButtonState();
		// $(".deadEnemies").css("visibility","hidden");
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
			$(".attackButton").show();
		}
	});

	$(".attackButton").on("click", function(){
		healthUpdate();
		enemyDies();
	});

	$(".newGame").on("click", function(){
		startNewGame();
	});
})













