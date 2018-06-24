/**
 * An SchSrch API client.
 *
 * @module schsrch-js
 * @author FICTURE7
 * @version 0.1.0
 */
"use strict";
const https = require('https');

/* base url to schsrch */
const SCHSRCH_URL = 'https://schsrch.xyz/';

/*
 * returns a promise which resolves
 * with the json data
 */
function getJson(url) {
	return new Promise((resolve, reject) => {
		let rawData = '';
		https.get(url, (res) => {
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

/* performs a search */
function doSearch(query) {
	return new Promise((resolve, reject) => {	
		/* TODO: add more checks and stuff */
		let queryStr = '';
		if ('id' in query) {
			queryStr += query.id.toString();
		}

		if ('season' in query && 'year' in query) {
			queryStr += query.season;
			queryStr += query.year.toString();
		} else {
			reject(Error(''));
		}

		getJson(SCHSRCH_URL + 'search/?as=json&query=' + queryStr).then((json) => {
			resolve(json);
		});
	});
}

/* retrieves all subjects */
function getSubjects() {
	return new Promise((resolve, reject) => {
		getJson(SCHSRCH_URL + 'subjects/?as=json').then((json) => {
			resolve(json);
		});
	});
}

/* 
 * object which is returned when no parameter
 * is passed to `get`
 */
var getObject = {
	subjects: () => {
		return getSubjects();
	}
}


/**
 * Performs a search query with the specified
 * query parameter.
 *
 * @param {object} [query] Query parameters object.
 */
function get(query) {
	if (typeof query !== 'undefined') {
		return doSearch(query);
	} else {
		return getObject;
	}
}

/* export the goods */
module.exports.get = get;
