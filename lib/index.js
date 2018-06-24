/**
 * An schsrch API client.
 *
 * @module schsrch-js
 * @author FICTURE7
 * @version 0.1.0
 */
"use strict";
const https = require('https');

/* base url to schsrch.xyz */
const SCHSRCH_URL = 'https://schsrch.xyz/';

/**
 * Retrieves the subjects avaliable from
 * schsrch
 */
function subjects() {
	return new Promise((resolve, reject) => {
		/* TODO: implement */
	});
}

/**
 * Performs a search query with the specified
 * query parameter.
 *
 * @param {object} query Query parameters object.
 */
function search(query) {	
	/* TODO: add more checks and stuff */
	let queryStr = '';
	if ('id' in query) {
		queryStr += query.id.toString();
	}
	if ('season' in query) {
		queryStr += query.season;
	}
	if ('year' in query) {
		queryStr += query.year.toString();
	}

	return new Promise((resolve, reject) => {
		let rawData = '';
		https.get(SCHSRCH_URL + 'search/?as=json&query=' + query, (res) => {
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				const data = JSON.parse(rawData);
				resolve(data);
			});
		});
	});
}

/* export the goods */
module.exports.subjects = subjects;
module.exports.search = search;
