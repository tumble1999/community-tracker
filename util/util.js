const
	stringSimilarity = require('string-similarity');
/**
 * 
 * @param {Array.<String>} array 
 * @param {String} value 
 */
function getCloseset(array, value) {
	let similarity = stringSimilarity.findBestMatch("_" + value.toLowerCase().replace(" ", "☺"), array.map(a => "_" + a.toLowerCase().replace(" ", "☺")));
	console.log("Similarities of " + value, similarity.ratings);
	return {
		value: array[similarity.bestMatchIndex],
		rating: similarity.ratings[similarity.bestMatchIndex].rating,
		index: similarity.bestMatchIndex,
		ratings: similarity.ratings
	};
}
function toTitle(str) { return str.toLowerCase().split(" ").map((e => e.charAt(0).toUpperCase() + e.slice(1))).join(" "); }


module.exports = { getCloseset, toTitle };