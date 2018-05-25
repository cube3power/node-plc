var pad = function(tt, length, str, direction){
	if (tt.length >= length) return tt;
	var pad = (str == null ? ' ' : '' + str)
		.repeat(length - tt.length)
		.substr(0, length - tt.length);
	if (!direction || direction == 'right') return tt + pad;
	if (direction == 'left') return pad + tt;
	return pad.substr(0, (pad.length / 2).floor()) + tt + pad.substr(0, (pad.length / 2).ceil());
};
exports.pad = pad;

var sumCheck = function (arr) {
	var sum = 0;
	for(var i=0; i<arr.length; i++) {
		sum += arr[i];
	}
	var sumStr = pad(String(sum.toString(16).toUpperCase()),2,"0","left");
	sumStr = sumStr.substring(sumStr.length-2);
	var arr2 = [];
	for(var i=0; i<sumStr.length; i++) {
		arr2.push(sumStr.charCodeAt(i));
	}
	return arr2;
};
exports.sumCheck = sumCheck;

//var arr = sumCheck([0x31,0x31,0x30,0x32,0x38,0x30,0x32,0x31,0x30,0x30,0x30,0x03]);
//console.log(arr[0].toString(16));
//console.log(arr[1].toString(16));