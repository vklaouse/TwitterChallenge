# TwitterChallenge

To run the project you need to install node.js (https://nodejs.org/en/).

When it's done open your terminal and run :
*     `git clone https://github.com/vklaouse/TwitterChallenge.git TwitterChallenge`

To launch the project go to the folder TwitterChallenge, run in your terminal
*     `cd TwitterChallenge`

To install the project
*     `npm install`

You must install the connection codes to the api twitter in the configuration.js file
   
And run the server
*     `node server.js & open http://localhost:8080`

To interrupt the execution of the server
*     `fg` + `Ctrl + c`

You can change search hashtags (Without '#', they are automatically added)
*     `./Configuration "YourFirstHashtag" "YourSecondtHashtag" "..."`

Or you can manually change to configuration.js the first line (don't forget the hashtags before the words).
