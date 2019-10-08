const fs = require('fs');
const del = require('del');

const dataFolder = "build/";
var source = dataFolder + 'index.html.gz';
var destination = dataFolder + '/out/index.html.gz.h';

var wstream = fs.createWriteStream(destination);
wstream.on('error', function (err) {
    console.log(err);
    process.exit(1);
});

var data = fs.readFileSync(source);

wstream.write('#define index_html_gz_len ' + data.length + '\n');
wstream.write('const uint8_t index_html_gz[] PROGMEM = {')

for (i = 0; i < data.length; i++) {
    if (i % 1000 == 0) wstream.write("\n");
    wstream.write('0x' + ('00' + data[i].toString(16)).slice(-2));
    if (i < data.length - 1) wstream.write(',');
}

wstream.write('\n};')
wstream.end();
del([source]);