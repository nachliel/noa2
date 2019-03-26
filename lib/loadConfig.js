/**
 * Configuration file,
 * Purpose: To load configuration data.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const rc = require('rc');
// Set HOSTS for domain Configuration
const hostile = require('hostile');
hostile.HOSTS = './resources/hosts';

// CONSTANTS:
const CONFIG_DIRECTORY = path.join(__dirname, './.dnsproxyrc');

const preserveFormatting = false

// Pre-Allocating Array Max Domains: 150K:
const N = 150000;
const domainsArray = new Array(N);
let index = 0;

// Main configureation variable and default configuration
const defaults = {
    port: 53,
    host: '192.168.14.5',
    logging: 'dnsproxy:query,dnsproxy:info',
    nameservers: [
        '212.199.54.202', '199.203.56.218'
    ],
    servers: {},
    domains: {
      'dev': '127.0.0.1'
    },
    hosts: {
      'devlocal': '127.0.0.1'
    },
    fallback_timeout: 350,
    reload_config: true,
    config : './config.json',
    defaultRedirect : '0.0.0.0'
};

const config = rc('dnsproxy', defaults);

module.exports = function(callback) {
    //console.log(`loading config: ${CONFIG_DIRECTORY}`);
    console.log(`Loading configuration...`);
    // if the static data was already set. return it
    /*
    if (config != null && config != undefined) {
        return config;
    }
    
    //configData = JSON.parse(fs.readFileSync(CONFIG_DIRECTORY));
    */
    load(() => {
        if (callback) {
            callback(config);
        }
    });
    //return configData;
}

// Load HOST file
function load(callback) {
    hostile.get(preserveFormatting, function (err, lines) {
        if (err) {
            console.error(err.message)
        }
        lines.forEach(function (line) {
            domainsArray[index++] = line[1];
        });
        config.domains = domainsArray;
        
        callback();
    });
}
