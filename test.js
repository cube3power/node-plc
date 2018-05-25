var plc = require("./plc");

var buf = plc.on("mitsubishi","Y0");
console.log(buf);

var buf2 = plc.off("mitsubishi","Y0");
console.log(buf2);

var buf2 = plc.wr("mitsubishi","D200","0");
console.log(buf2);//<Buffer 02 31 31 30 32 38 30 32 30 30 31 30 03 32 32>