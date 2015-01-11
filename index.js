var path = require("path"),
	fs = require("fs"),
	json = require("jsonfile"),
	modules = json.readFileSync("modules.json"),
	glob = require('glob');

console.log("modules: " + JSON.stringify(modules));

function attain(mod_name) {
	var projectRoot = path.join(__dirname, '..', '..');
	// ^^ Should be folder containing the projects node_modules. Verify this.
	var path = modules[mod_name];

	if(typeof(path) == "undefined") {
		//file has not been found, must find it first

		var pattern = projectRoot + '/**/' + mod_name + '/*';
		var searchResults = glob.sync(pattern);

		//If there are no || many results, it would be crazy to pick one randomly
		if(searchResults.length === 0) {
			throw new Error(mod_name + ' does not exist!');
		} else if(searchResults.length > 1) {
			throw new Error('There are multiple files named ' + mod_name);
		}

		//Only save the relative path.
		path = searchResults[0].substr(projectRoot.length + 1);
		modules[mod_name] = path;

		//save changes
		json.writeFileSync("modules.json", modules);
	}

	return projectRoot + path;
	
}

module.exports = attain;