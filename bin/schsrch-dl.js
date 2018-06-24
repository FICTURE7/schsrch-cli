const schsrch = require('schsrch-js');

schsrch.get().subjects().then((val) => {
	console.log(val);
});

schsrch.get({
	id: 9702,
	season: 'w',
	year: 18
}).then((val) => {
	console.log(val);
}).catch((err) => {
	console.log(err);
});
