/**
*	Connection to socket.io
**/

var socket = io.connect('http://localhost:8080');

/**
*	Show the score for the new users
**/

socket.on('highScore' ,function(highScore){
	bestScore = highScore;
	$('#myScore').remove();
	$('#bestScore').remove();
	$('#score').append('<div class="score" id="myScore">Score: 0</div>');
	$('#score').append('<div class="score" id="bestScore">Best Score: '+bestScore+'</div>');
});

/**
*	Send an event to the socket
**/

$('#loginform').submit(function(event){
	event.preventDefault();
	if ($('#username').val().length > 3){
		socket.emit('login', {
			username: $('#username').val(),
			id: 'U'+ Math.random() * (10000 - 1) + 1
		})
	}
	else{
		champ = document.getElementById('username');
		champ.style.borderColor = "#ff0000";
	}

});

/**
*	Hide the login window
**/

socket.on('logged', function(){
	$('#login').fadeOut();
});

/**
*	Show users connected when a user login
**/

socket.on('newuser', function(user){
	$('#user').append('<p id="'+ user.id +'" ><em>' + user.username + ' a rejoint le TwitterChallenge !</em></p>');
});

/**
*	Display the users connected when
**/

socket.on('HideNewUser', function(user){
	$('#user').hide(2000);
});

/**
*	Create the explosion animation
**/

$('body').append('<canvas id="Explosion" style="display:none;"></canvas>');
var renderer = PIXI.autoDetectRenderer(1000, 40, { transparent: true, view: Explosion });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
PIXI.loader
    .add('img/GIF/explosion1.png')
    .add('img/GIF/explosion2.png')
    .add('img/GIF/explosion3.png')
    .add('img/GIF/explosion4.png')
    .add('img/GIF/explosion5.png')
    .add('img/GIF/explosion6.png')
    .add('img/GIF/explosion7.png')
    .add('img/GIF/explosion8.png')
    .add('img/GIF/explosion9.png')
    .add('img/GIF/explosion10.png')
    .add('img/GIF/explosion11.png')
    .add('img/GIF/explosion12.png')
    .add('img/GIF/explosion13.png')
    .add('img/GIF/explosion14.png')
    .add('img/GIF/explosion15.png')
    .add('img/GIF/explosion16.png')
    .add('img/GIF/explosion17.png')
    .load(onAssetsLoaded);

function onAssetsLoaded()
{
    var explosionTextures = [];
    var j;
    for (j = 1; j < 17; j++) {
         var texture = PIXI.Texture.fromFrame('img/GIF/explosion' + (j+1) + '.png');
         explosionTextures.push(texture);
    }

    for (j = 0; j < 50; j++) {
        var explosion = new PIXI.extras.MovieClip(explosionTextures);

        explosion.position.x = Math.random() * 1000;
        explosion.position.y = Math.random() * 40;
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.rotation = Math.random() * Math.PI;
        explosion.scale.set(0.75 + Math.random() * 0.5);
        explosion.gotoAndPlay(Math.random() * 27);
        stage.addChild(explosion);
    }
    requestAnimationFrame(animate);
}
function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
}
		
/**
*	Refresh the best score
**/

var Score = 0;
var bestScore = 0;
socket.emit('score', Score);
	socket.on('bestScore', function(newBestScore) {
		bestScore = newBestScore;
		$('#bestScore').remove();
		$('#score').append('<div class="score" id="bestScore">Best Score: '+bestScore+'</div>');
	});

/**
*	Click on a tweet and blow it up and give points
**/

function destroyCanvas(event, id){
	Score += 10;
	socket.emit('score', Score);
	$('#myScore').remove();
	$('#bestScore').remove();
	$('#score').append('<div class="score" id="myScore">Score: '+Score+'</div>');
	$('#score').append('<div class="score" id="bestScore">Best Score: '+bestScore+'</div>');
	toggleDisplay('Explosion');
	var x = event.clientX;
 	var y = event.clientY;
 	x -= 500;
 	y -= 70;
 	var elmt = document.getElementById('Explosion');
 	elmt.style.marginTop = y + "px";
 	elmt.style.marginLeft = x + "px";
	setTimeout(function() {
		$('#Explosion').hide();
		$('#'+id).hide();
	}, 500);
}

/**
*	Change the style of the Canvas hide
**/


function toggleDisplay(elmt) {
   if(typeof elmt == "string")
      elmt = document.getElementById(elmt);
   if(elmt.style.display == "none")
      elmt.style.display = "";
}


/**
*  Display the Tweets on the Canvas
**/

var i = 0;
var oldTweet = null;
var style = {
	fontFamily : 'Arial',
	fontSize : '13px',
	fill: '#FFFFFF'
};

socket.on('tweet', function(tweet){
	if (i == 0){
		var cnt = 1;
		while (cnt < 14) {
			$('#canvaswait').append('<canvas id="s'+ cnt.toString() + '" style="border:solid 1px white;"onclick="destroyCanvas(event, this.id);""></canvas>');
			cnt++;
		}
		$('#canvaswait').hide();
	}
	if (oldTweet != tweet.id_str){
		i++
		if (i == 14)
			i = 1;
		n = 's'+ i.toString();
		//var options = "{view: "+ n +" , backgroundColor : 0xFFFFFF}"; // Doesn't work, i try but i had no choice D:
		//var renderer = PIXI.autoDetectRenderer(800, 40, options);
		if (n == 's1')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s1, transparent: true});
		else if (n == 's2')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s2, transparent: true});
		else if (n == 's3')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s3, transparent: true});
		else if (n == 's4')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s4, transparent: true});
		else if (n == 's5')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s5, transparent: true});
		else if (n == 's6')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s6, transparent: true});
		else if (n == 's7')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s7, transparent: true});
		else if (n == 's8')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s8, transparent: true});
		else if (n == 's9')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s9, transparent: true});
		else if (n == 's10')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s10, transparent: true});
		else if (n == 's11')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s11, transparent: true});
		else if (n == 's12')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s12, transparent: true});
		else if (n == 's13')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s13, transparent: true});
		toggleDisplay(n);
		document.body.appendChild(renderer.view);
		var stage = new PIXI.Container();
		var TweetText = tweet.text.replace(/\s/g," ");
		var randomColor = Math.random() * (7 - 1) + 1;
		if (randomColor <= 2)
			style.fill = '#00FFFF';
		else if (randomColor <= 3)
			style.fill = '#FFFF00';
		else if (randomColor <= 4)
			style.fill = '#FF1493';
		else if (randomColor <= 5)
			style.fill = '#7CFC00';
		else if (randomColor <= 6)
			style.fill = '#FF0000';
		else
			style.fill = '#FFFFFF';
		var basicText = new PIXI.Text(tweet.user.name + ' : ' + TweetText, style);
		basicText.x = 10;
		basicText.y = 12;
		stage.addChild(basicText);
		renderer.render(stage);
		oldTweet = tweet.id_str;
	}
});
