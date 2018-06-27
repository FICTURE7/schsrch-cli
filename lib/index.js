/**
 * A SchSrch API client.
 *
 * @module schsrch-js
 * @author FICTURE7
 * @version 0.1.0
 */
"use strict";
const https = require('https');

/* base urls to schsrch */
const SCHSRCH_URL = 'https://schsrch.xyz/';
const SCHSRCH_SUBJECTS_URL = SCHSRCH_URL + 'subjects/?as=json';
const SCHSRCH_SEARCH_URL = SCHSRCH_URL + 'search/?as=json&query=';

/*
 * returns a promise which resolves
 * with the json data
 */
function getJson(url) {
	return new Promise((resolve, reject) => {
		let rawData = '';
		https.get(url, (res) => {
			res.on('err', (err) => {
				reject(err);
			});
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

		getJson(SCHSRCH_SEARCH_URL + queryStr).then((json) => {
			resolve(json);
		}).catch((err) => {
			reject(err);
		});
	});
}

/* retrieves all subjects */
function getSubjects() {
	return new Promise((resolve, reject) => {
		getJson(SCHSRCH_SUBJECTS_URL).then((json) => {
			let subjects = [];
			for (let subjectJson in json) {
				subjects.push(new Subject(subjectJson.id, subjectJson.name, subjectJson.level));
			}
			resolve(subjects);
		}).catch((err) => {
			reject(err);
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
 * Represents an examination.
 */
class Examination {
	constructor(name, shortName) {
		this.name = name;
		this.shortName = shortName;
	}
}

/**
 * Represents a subject.
 */
class Subject {
	constructor(id, name, examination, resources) {
		this.id = id;
		this.name = name;
		this.examination = examination;
		this.resources = resources;
	}
}

/**
 * Represents a query.
 */
class Query {
	constructor(id, name, season, year) {
		this.id = id;
		this.name = name;
		this.season = season;
		this.year = year;
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
module.exports.Subject = Subject;
