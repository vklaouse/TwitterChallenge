/**
*	Connection to socket.io
**/

var socket = io.connect('http://localhost:8080');

/**
*	Send an event to the socket
**/

$('#loginform').submit(function(event){
	event.preventDefault();
	socket.emit('login', {
		username: $('#username').val(),
		id: 'U'+ Math.random() * (100000 - 1) + 1
	})
});

/**
*	Hide the login window
**/

socket.on('logged', function(){
	$('#login').fadeOut();
});

/**
*	Shows users connected when a user login
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
*	Click event on the tweets
**/

function destroyCanvas(id){
	alert(id);
}

/**
*  Display the Tweets on the Canvas
**/

var i = 0;
var oldTweet = null;
var style = {
	fontFamily : 'Arial',
	fontSize : '14px',

};
socket.on('tweet', function(tweet){
	if (i == 0){
		var cnt = 1;
		while (cnt < 16) {
			$('#canvaswait').append('<canvas id="s'+ cnt.toString() + '" onclick="destroyCanvas(this.id);""></canvas>');
			cnt++;
		}
		$('#canvaswait').hide();
	}
	if (oldTweet != tweet.id_str){
		i++
		if (i == 16)
			i = 1;
		n = 's'+ i.toString();
		//var options = "{view: "+ n +" , backgroundColor : 0xFFFFFF}"; // Doesn't work, i try but i had no choice D:
		//var renderer = PIXI.autoDetectRenderer(800, 40, options);
		if (n == 's1')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s1, backgroundColor : 0xFFFFFF});
		else if (n == 's2')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s2, backgroundColor : 0xFFFFFF});
		else if (n == 's3')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s3, backgroundColor : 0xFFFFFF});
		else if (n == 's4')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s4, backgroundColor : 0xFFFFFF});
		else if (n == 's5')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s5, backgroundColor : 0xFFFFFF});
		else if (n == 's6')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s6, backgroundColor : 0xFFFFFF});
		else if (n == 's7')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s7, backgroundColor : 0xFFFFFF});
		else if (n == 's8')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s8, backgroundColor : 0xFFFFFF});
		else if (n == 's9')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s9, backgroundColor : 0xFFFFFF});
		else if (n == 's10')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s10, backgroundColor : 0xFFFFFF});
		else if (n == 's11')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s11, backgroundColor : 0xFFFFFF});
		else if (n == 's12')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s12, backgroundColor : 0xFFFFFF});
		else if (n == 's13')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s13, backgroundColor : 0xFFFFFF});
		else if (n == 's14')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s14, backgroundColor : 0xFFFFFF});
		else if (n == 's15')
			var renderer = PIXI.autoDetectRenderer(1100, 40, {view: s15, backgroundColor : 0xFFFFFF});
		document.body.appendChild(renderer.view);
		var stage = new PIXI.Container();
		var TweetText = tweet.text.replace(/\s/g," ");
		var basicText = new PIXI.Text(tweet.user.name + ' : ' + TweetText, style);
		basicText.x = 5;
		basicText.y = 12;
		stage.addChild(basicText);
		renderer.render(stage);
		oldTweet = tweet.id_str;
	}
});