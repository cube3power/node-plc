//type:mitsubishi, sfcp:Y0, return:02 37 30 30 30 35 03 46 46
var force_on = function(type,sfcp) {
	var typeObj = require("./lib/"+type);
	return typeObj.force_on(sfcp);
};
exports.on = force_on;

var force_off = function(type,sfcp) {
	var typeObj = require("./lib/"+type);
	return typeObj.force_off(sfcp);
};
exports.off = force_off;

var write = function(type,sfcp,dataBuf) {
	var typeObj = require("./lib/"+type);
	return typeObj.write(sfcp,dataBuf);
};
exports.wr = write;