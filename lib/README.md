## schsrch-js
Library to interact with the API of SchSrch.

### Examples
Searching for resources.
```js
var schsrch = require('schsrch-js');

schsrch.get('9702 w17').then((results) => {
	/* do stuff with results */
});
```

Getting the subjects list.
```js
var schsrch = require('schsrch-js');

schsrch.get().subjects().then((subjects) => {
	/* do stuff with subjects */
});
```
