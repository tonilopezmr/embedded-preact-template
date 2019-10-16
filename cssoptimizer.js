var uncss = require('uncss');
const fs = require('fs');
const del = require('del');
const { exec } = require('child_process');

const cssPath = "./src/style.css";
const cssAux = "./src/style-copy.css"
const htmlFile = "./build/index.html"

var wstream = fs.createWriteStream(cssAux);
wstream.on('error', function (err) {
    console.log(err);
    process.exit(1);
});

var css = fs.readFileSync(cssPath);
wstream.write(css);
wstream.end();

var files = [htmlFile],
    options = {
        banner: false,
        csspath: '',
        htmlroot: './src/',
        jsdom: {
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
        },
        report: false,
        stylesheets: ['style.css'],
        timeout: 1000,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)',
    };

uncss(files, options, function (error, output) {
    if (error) {
        console.log("UnCss Error: " + error);
        process.exit(1);
        return;
    }

    var wstream = fs.createWriteStream(cssPath);
    wstream.on('error', function (err) {
        console.log(err);
        process.exit(1);
    });

    wstream.write(output);
    wstream.end();

    exec('yarn build:em', (err, stdout, stderr) => {
        if (err) {
            console.log("Error when try to build the project");
            process.exit(1);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);

        var wstream = fs.createWriteStream(cssPath);
        wstream.on('error', function (err) {
            console.log(err);
            process.exit(1);
        });

        var css = fs.readFileSync(cssAux);
        wstream.write(css);
        wstream.end();
        del([cssAux]);
    });
    console.log("Saved new output in style.css");
});