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

function destroyCanvas(event, id){

/*



		if (id == 's1')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s1, backgroundColor : 0xFFFFFF});
		else if (id == 's2')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s2, backgroundColor : 0xFFFFFF});
		else if (id == 's3')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s3, backgroundColor : 0xFFFFFF});
		else if (id == 's4')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s4, backgroundColor : 0xFFFFFF});
		else if (id == 's5')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s5, backgroundColor : 0xFFFFFF});
		else if (id == 's6')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s6, backgroundColor : 0xFFFFFF});
		else if (id == 's7')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s7, backgroundColor : 0xFFFFFF});
		else if (id == 's8')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s8, backgroundColor : 0xFFFFFF});
		else if (id == 's9')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s9, backgroundColor : 0xFFFFFF});
		else if (id == 's10')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s10, backgroundColor : 0xFFFFFF});
		else if (id == 's11')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s11, backgroundColor : 0xFFFFFF});
		else if (id == 's12')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s12, backgroundColor : 0xFFFFFF});
		else if (id == 's13')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s13, backgroundColor : 0xFFFFFF});
		else if (id == 's14')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s14, backgroundColor : 0xFFFFFF});
		else if (id == 's15')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s15, backgroundColor : 0xFFFFFF});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a background...
//var background = PIXI.Sprite.fromImage('img/giphy (1)-3.png');
//background.width = renderer.width;
//background.height = renderer.height;

// add background to stage...
//stage.addChild(background);

// create some textures from an image path
var textureButton = PIXI.Texture.fromImage('img/giphy (1)-4.png');
var textureButtonDown = PIXI.Texture.fromImage('img/giphy (1)-5.png');
var textureButtonOver = PIXI.Texture.fromImage('img/giphy (1)-6.png');

var buttons = [];

var noop = function () {
	console.log('click');
};

for (var j = 0; j < 1; j++)
{
    var button = new PIXI.Sprite(textureButton);
    button.buttonMode = true;

    button.anchor.set(0.5);

    button.position.x = 0;
    button.position.y = 0;

    // make the button interactive...
    button.interactive = true;
	
	

    button
        // set the mousedown and touchstart callback...
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)

        // set the mouseup and touchend callback...
        .on('mouseup', onButtonUp)
        .on('touchend', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchendoutside', onButtonUp)

        // set the mouseover callback...
        //.on('mouseover', onButtonOver)

        // set the mouseout callback...
        //.on('mouseout', onButtonOut)


        // you can also listen to click and tap events :
        //.on('click', noop)
        
	button.tap = noop;
	button.click = noop;
    // add it to the stage
    stage.addChild(button);

    // add button to array
    buttons.push(button);
}


animate();

function animate() {
    // render the stage
    renderer.render(stage);

    requestAnimationFrame(animate);
}

function onButtonDown()
{
	console.log("Down");
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
}

function onButtonUp()
{
	console.log("Up");
    this.isdown = false;

    if (this.isOver)
    {
        this.texture = textureButtonOver;
    }
    else
    {
        this.texture = textureButton;
    }
}
*/











	var x = event.clientX;
 	var y = event.clientY;
 	
	setTimeout(function() {
		$('#'+id).hide();
	}, 1000);
	//alert('X = '+x+' Y ='+y);
}

/**
*	Change the style of the Canvas hide
**/


function toggleDisplay(elmt)
{
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
};

socket.on('tweet', function(tweet){
	if (i == 0){
		var cnt = 1;
		while (cnt < 16) {
			$('#canvaswait').append('<canvas id="s'+ cnt.toString() + '" onclick="destroyCanvas(event, this.id);""></canvas>');
			cnt++;
		}
		$('#canvaswait').append('<canvas id="test" style="background-color:red;"></canvas>');
			cnt++;
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
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s1, backgroundColor : 0xFFFFFF});
		else if (n == 's2')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s2, backgroundColor : 0xFFFFFF});
		else if (n == 's3')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s3, backgroundColor : 0xFFFFFF});
		else if (n == 's4')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s4, backgroundColor : 0xFFFFFF});
		else if (n == 's5')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s5, backgroundColor : 0xFFFFFF});
		else if (n == 's6')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s6, backgroundColor : 0xFFFFFF});
		else if (n == 's7')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s7, backgroundColor : 0xFFFFFF});
		else if (n == 's8')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s8, backgroundColor : 0xFFFFFF});
		else if (n == 's9')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s9, backgroundColor : 0xFFFFFF});
		else if (n == 's10')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s10, backgroundColor : 0xFFFFFF});
		else if (n == 's11')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s11, backgroundColor : 0xFFFFFF});
		else if (n == 's12')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s12, backgroundColor : 0xFFFFFF});
		else if (n == 's13')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s13, backgroundColor : 0xFFFFFF});
		else if (n == 's14')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s14, backgroundColor : 0xFFFFFF});
		else if (n == 's15')
			var renderer = PIXI.autoDetectRenderer(1000, 40, {view: s15, backgroundColor : 0xFFFFFF});
		toggleDisplay(n);
		document.body.appendChild(renderer.view);
		var stage = new PIXI.Container();
		var TweetText = tweet.text.replace(/\s/g," ");
		var basicText = new PIXI.Text(tweet.user.name + ' : ' + TweetText, style);
		basicText.x = 10;
		basicText.y = 12;
		stage.addChild(basicText);
		renderer.render(stage);
		oldTweet = tweet.id_str;
	}
});













/*





var renderer = PIXI.autoDetectRenderer(1000, 600, { transparent: true });
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a background...
//var background = PIXI.Sprite.fromImage('img/giphy (1)-3.png');
//background.width = renderer.width;
//background.height = renderer.height;

// add background to stage...
//stage.addChild(background);

// create some textures from an image path
var textureButton = PIXI.Texture.fromImage('img/step1.jpg');
var textureButtonDown = PIXI.Texture.fromImage('img/giphy (1)-5.png');
var textureButtonOver = PIXI.Texture.fromImage('img/giphy (1)-6.png');

var buttons = [];

var buttonPositions = [
    175, 75,
    655, 75,
    410, 325,
    150, 465,
    685, 445
];

var noop = function () {
	console.log('click');
};

for (var j = 0; j < 5; j++)
{
    var button = new PIXI.Sprite(textureButton);
    button.buttonMode = true;

    button.anchor.set(0.5);

    button.position.x = buttonPositions[j*2];
    button.position.y = buttonPositions[j*2 + 1];

    // make the button interactive...
    button.interactive = true;
	
	

    button
        // set the mousedown and touchstart callback...
        .on('mousedown', onButtonDown)
        .on('touchstart', onButtonDown)

        // set the mouseup and touchend callback...
        .on('mouseup', onButtonUp)
        .on('touchend', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchendoutside', onButtonUp)

        // set the mouseover callback...
        //.on('mouseover', onButtonOver)

        // set the mouseout callback...
        //.on('mouseout', onButtonOut)


        // you can also listen to click and tap events :
        //.on('click', noop)
        
	button.tap = noop;
	button.click = noop;
    // add it to the stage
    stage.addChild(button);

    // add button to array
    buttons.push(button);
}


animate();

function animate() {
    // render the stage
    renderer.render(stage);

    requestAnimationFrame(animate);
}

function onButtonDown()
{
	console.log("Down");
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
}

function onButtonUp()
{
	console.log("Up");
    this.isdown = false;

    if (this.isOver)
    {
        this.texture = textureButtonOver;
    }
    else
    {
        this.texture = textureButton;
    }
}
/*
function onButtonOver()
{	
	console.log("Over");
    this.isOver = true;

    if (this.isdown)
    {
        return;
    }

    this.texture = textureButtonOver;
}

function onButtonOut()
{
	console.log("Out");
    this.isOver = false;

    if (this.isdown)
    {
        return;
    }

    this.texture = textureButton;
}
*/