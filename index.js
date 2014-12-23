var path = require("path"),
	fs = require("fs"),
	mod_file_name = "modules.json";



function find(mod_name) {
	var module_path = path.join('..', '..');
	var files = [];
	var mod_index = 0;
	do {
		files = fs.readdirSync(module_path);
		mod_index = files.indexOf(mod_file_name)
		if(mod_index < 0) {
			path.join(module_path, '..');
		}
	} while(mod_index < 0);

	var modules = require(path.join(module_path, mod_file_name));

	var path = modules[mod_name];
	if(typeof(path) == "undefined") {
		throw new Error("File not recognized");
	}
	return path;
}


module.exports = find;
//module.exports.add = add;
//module.exports.update = update;