

var twit = require('twitter'),
	twitter = new twit({
		consumer_key: '3GfegpTIRmndaEHwJcDX9e4j5',
		consumer_secret: 'rTQxCS17P9r4a9lrE7EMO3KA7jEnufiD3LO7p7wTLNxmC9g04D',
		access_token_key: '2776305215-bJiqHRwcEwh5O8J8TUe1n6sWu6vU2Di9XdsLVO6',
		access_token_secret: '6dEu1vMXIuALwuyU93FTcWRv3FaWItXgMsC1WBmpzVGfa'
	});

twitter.stream('statuses/filter', { track: '#Paris' },
    function(stream) {
 
        stream.on('data', function( tweet ) {
            console.log(tweet);
        });
 
        stream.on('error', function ( error ) {
            console.error(error);
        });
 
    });