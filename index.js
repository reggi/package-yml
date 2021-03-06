var yaml = require('js-yaml');
var fs = require('fs');
var path = require("path");

function yamlToJsonSync(yamlFilePath, jsonFilePath) {
  var yamlFileData = fs.readFileSync(yamlFilePath, "utf8");
  yamlFileData = yaml.load(yamlFileData);
  yamlFileData = JSON.stringify(yamlFileData, null, 4);
  return fs.writeFileSync(jsonFilePath, yamlFileData);
}

function jsonToYamlSync(jsonFilePath, yamlFilePath) {
  var jsonFileData = fs.readFileSync(jsonFilePath, "utf8");
  jsonFileData = JSON.parse(jsonFileData);
  jsonFileData = yaml.dump(jsonFileData);
  return fs.writeFileSync(yamlFilePath, jsonFileData);
}

var projectDir = process.cwd();
var jsonFilePath = path.join(process.cwd(), "package.json");
var jsonFileExists = fs.existsSync(jsonFilePath);
var ymlFilePath = path.join(projectDir, "package.yml");
var yamlFilePath = path.join(projectDir, "package.yml");
var ymlFileExists = fs.existsSync(ymlFilePath);
var yamlFileExists = fs.existsSync(ymlFilePath);
var ymlOrYamlFilePath = function() {
  if (ymlFileExists) return ymlFilePath;
  if (yamlFileExists) return yamlFilePath;
  return false;
}()

if (ymlOrYamlFilePath) {
  yamlToJsonSync(ymlOrYamlFilePath, jsonFilePath)
} else if(jsonFileExists) {
  jsonToYamlSync(jsonFilePath, ymlFilePath);
  fs.unlinkSync(jsonFilePath);
}

process.on('exit', function() {
  var jsonFileExists = fs.existsSync(jsonFilePath); //json might exist now (npm init)
  if (jsonFileExists) {
      var existingYmlOrYamlOrYml = ymlOrYamlFilePath || ymlFilePath;
      jsonToYamlSync(jsonFilePath, existingYmlOrYamlOrYml);
      fs.unlinkSync(jsonFilePath);
  }
});
