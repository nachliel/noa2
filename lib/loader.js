'use strict';

//Load hosts file

const fs = require('fs');
const hostile = require('hostile');
hostile.HOSTS = './hosts';
console.log(hostile.HOSTS);

const preserveFormatting = false

// Pre-Allocating Array Max Domains: 150K:
const N = 150000;
const domainsArray = new Array(N);
let index = 0;

// Measurement:
const hrstart = process.hrtime();

load(() => {
    console.log('Finish Load.');
    console.log('Sorting...');
    domainsArray.sort();
    const hrend = process.hrtime(hrstart);
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
});

// Load HOST file
function load(callback) {
    hostile.get(preserveFormatting, function (err, lines) {
        if (err) {
            console.error(err.message)
        }
        lines.forEach(function (line) {
            domainsArray[index++] = line[0];
        });
        
        callback();
    });
}

module.exports = domainsArray;
