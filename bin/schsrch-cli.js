"use strict";
const schsrch = require('schsrch-js');
const argv = require('yargs')
	.usage('$0 <cmd> [args]')
	.command(['list', 'ls'], 'list all subjects', 
		(yargs) => {
			return yargs.option('exam', {
				alias: 'e',
				describe: 'examination filter',
				choices: [
					'a/as',
					'as',
					'al',
					'igcse'
				]
			});
		}, 
		(argv) => {
			/* exam/level name filter */
			let exam = '';
			switch (argv.exam) {
				case 'a/as':
					exam = 'A/s';
					break;
				case 'as':
					exam = 'AS';
					break;
				case 'al':
					exam = 'AL';
					break;
				case 'igcse':
					exam = 'IGCSE';
					break;
			}
			
			schsrch.get().subjects().then((subjects) => {
				for (let subject of subjects) {
					/* subject with id 8683 has a name whose value is null */
					if (subject.name !== null) {
						/* filter exam if filter specified */
						if (exam !== '' && subject.examination !== exam) {
							continue;
						}

						console.log(subject.name + ' e: ' + subject.level);
					}
				}
			}).catch((err) => {
				process.exit(1);
			});
		}
	)
	.help()
	.argv;

