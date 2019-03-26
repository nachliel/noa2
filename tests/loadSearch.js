require("../lib/loadConfig")((config)=>{
// Checks
/*
if (config.reload_config === true) {
    let configFile = config.config;
    fs.watchFile(configFile, function (curr, prev) {
    loginfo('config file changed, reloading config options');
    try {
        config = rc('dnsproxy', defaults);
    } catch (e) {
        logerror('error reloading configuration');
        logerror(e);
    }
    });
}
*/
    console.log(`Configuration Loaded.`);
    main(config);
});
  
function main(config) {
    let domain = process.argv[2] || 'nada.com';

    console.log(`Search in list for domain: ${domain}`);
    searchNumber = config.domains.indexOf(domain);

    if (searchNumber >= 0) {
        console.log(`Found! index Number: ${searchNumber}`);
    }
    else {
        console.log(`No Resaults.`);
    }
    /*
    config.domains.forEach(element => {
        console.log(element);
    });
    */
}