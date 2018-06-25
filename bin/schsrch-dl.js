const schsrch = require('schsrch-js');
const argv = require('yargs')
	.command(['list', 'ls'], 'list all subjects', () => {}, (argv) => {
		schsrch.get().subjects().then((subjects) => {
			for (let subject of subjects) {
				/* subject with id 8683 has a name whose value is null */
				if (subject.name != null) {
					console.log(subject.name);
				}
			}
		}).catch((err) => {
			process.exit(1);
		});
	})
	.argv;

