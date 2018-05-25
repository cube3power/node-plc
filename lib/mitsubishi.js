var util = require("./util");
/*
 * sfcp Y0:02 37 30 30 30 35 03 46 46
 */
var force_on = function(sfcp) {
	sfcp = sfcp.toUpperCase();
	if(sfcp.indexOf("Y") === 0) {
		var sfcp_num = sfcp.substring(1);
		var sfcpStr = util.pad((parseInt(sfcp_num,8)+1280).toString(16).toUpperCase(), 4,"0","left");
		sfcpStr = sfcpStr.substring(sfcpStr.length-4);
		var arr = [0x37,sfcpStr[2].charCodeAt(0),sfcpStr[3].charCodeAt(0),sfcpStr[0].charCodeAt(0),sfcpStr[1].charCodeAt(0),0x03];
		arr.push.apply(arr, util.sumCheck(arr));
		arr.unshift(0x02);
		var buf = new Buffer(arr);
		return buf;
	} else if(sfcp.indexOf("M") === 0) {
		var sfcp_num = sfcp.substring(1);
		var sfcpStr = util.pad((Number(sfcp_num)+256).toString(16).toUpperCase(), 4,"0","left");
		sfcpStr = sfcpStr.substring(sfcpStr.length-4);
		var arr = [0x37,sfcpStr[2].charCodeAt(0),sfcpStr[3].charCodeAt(0),sfcpStr[0].charCodeAt(0),sfcpStr[1].charCodeAt(0),0x03];
		arr.push.apply(arr, util.sumCheck(arr));
		arr.unshift(0x02);
		var buf = new Buffer(arr);
		return buf;
	}
	throw new Error(sfcp+" dose not support in force_on!");
};
exports.force_on = force_on;

var force_off = function(sfcp) {
	sfcp = sfcp.toUpperCase();
	if(sfcp.indexOf("Y") === 0) {
		var sfcp_num = sfcp.substring(1);
		var sfcpStr = util.pad((parseInt(sfcp_num,8)+1280).toString(16).toUpperCase(),4,"0","left");
		var arr = [0x38,sfcpStr[2].charCodeAt(0),sfcpStr[3].charCodeAt(0),sfcpStr[0].charCodeAt(0),sfcpStr[1].charCodeAt(0),0x03];
		arr.push.apply(arr, util.sumCheck(arr));
		arr.unshift(0x02);
		var buf = new Buffer(arr);
		return buf;
	} else if(sfcp.indexOf("M") === 0) {
		var sfcp_num = sfcp.substring(1);
		var sfcpStr = util.pad((Number(sfcp_num)+256).toString(16).toUpperCase(), 4,"0","left");
		var arr = [0x38,sfcpStr[2].charCodeAt(0),sfcpStr[3].charCodeAt(0),sfcpStr[0].charCodeAt(0),sfcpStr[1].charCodeAt(0),0x03];
		arr.push.apply(arr ,util.sumCheck(arr));
		arr.unshift(0x02);
		var buf = new Buffer(arr);
		return buf;
	}
	throw new Error(sfcp+" dose not support in force_off!");
};
exports.force_off = force_off;

var write = function(sfcp,dataBuf) {
	if(typeOf(dataBuf) === "string") dataBuf = new Buffer(dataBuf);
	if(!Buffer.isBuffer(dataBuf)) throw new Error("dataBuf must be Buffer");
	if(dataBuf.length > 131070) throw new Error("dataBuf length must be less than 131070");
	sfcp = sfcp.toUpperCase();
	if(sfcp.indexOf("D") === 0) {
		var sfcp_num = sfcp.substring(1);
		var sfcpStr = util.pad((Number(sfcp_num)*2+4096).toString(16).toUpperCase(), 4,"0","left");
		sfcpStr = sfcpStr.substring(sfcpStr.length-4);
		var arr = [0x31,sfcpStr[0].charCodeAt(0),sfcpStr[1].charCodeAt(0),sfcpStr[2].charCodeAt(0),sfcpStr[3].charCodeAt(0)];
		var dataLen1 = Math.round(dataBuf.length/4);
		var dataLen2 = dataBuf.length%4;
		var bufLen = dataLen1;
		if(dataLen2 > 0) bufLen++;
		var bufLenStr = util.pad((bufLen*2).toString(16).toUpperCase(),2,"0","left");
		arr.push(bufLenStr[0].charCodeAt(0),bufLenStr[1].charCodeAt(0));
		var buf2 = new Array(bufLen*4);
		for(var i=0; i<dataLen1; i++) {
			buf2[i*4] = dataBuf[i*4+2];
			buf2[i*4+1] = dataBuf[i*4+3];
			buf2[i*4+2] = dataBuf[i*4];
			buf2[i*4+3] = dataBuf[i*4+1];
		}
		if(dataLen2 > 0) {
			buf2[dataLen1*4] = dataBuf[dataLen1*4+2];
			if(buf2[dataLen1*4] === undefined) buf2[dataLen1*4] = 0x30;
			buf2[dataLen1*4+1] = dataBuf[dataLen1*4+3];
			if(buf2[dataLen1*4+1] === undefined) buf2[dataLen1*4+1] = 0x30;
			buf2[dataLen1*4+2] = dataBuf[dataLen1*4];
			if(buf2[dataLen1*4+2] === undefined) buf2[dataLen1*4+2] = 0x30;
			buf2[dataLen1*4+3] = dataBuf[dataLen1*4+1];
			if(buf2[dataLen1*4+3] === undefined) buf2[dataLen1*4+3] = 0x30;
		}
		arr.push.apply(arr, buf2);
		arr.push(0x03);
		arr.push.apply(arr, util.sumCheck(arr));
		arr.unshift(0x02);
		var buf = new Buffer(arr);
		return buf;
	}
	throw new Error(sfcp+" dose not support in write!");
};
exports.write = write;