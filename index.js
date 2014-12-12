var debug = require("debug")("npm-yaml");
var argv = require('minimist')(process.argv.slice(2));
var Promise = require("bluebird");
var yaml = require('js-yaml');
var fs = require('fs');
fs.readFile = Promise.promisify(fs.readFile);
fs.writeFile = Promise.promisify(fs.writeFile);
var path = require("path");

function existsAsync(path) {
  return new Promise(function(resolve) {
    fs.exists(path, resolve);
  });
}

function ymlOrYaml(projectDir) {
  var ymlFilePath = path.join(projectDir, "package.yml");
  var ymlFileExists = existsAsync(ymlFilePath);
  var yamlFilePath = path.join(projectDir, "package.yaml");
  var yamlFileExists = existsAsync(yamlFilePath);
  return Promise.all([ymlFileExists, yamlFileExists]).then(function(results) {
    if (results[0]) return ymlFilePath;
    if (results[1]) return yamlFilePath;
    throw new Error("no yaml or yml file");
  });
}

function yamlToJson(yamlPath, jsonPath) {
  return fs.readFile(yamlPath, "utf8")
    .then(yaml.load)
    .then(function(yamlConfig) {
      debug("converting yaml and writing");
      var jsonString = JSON.stringify(yamlConfig, null, 4);
      return fs.writeFile(jsonPath, jsonString)
    });
}

function yamlToJsonAsync(yamlFilePath, jsonFilePath) {
  debug("converting yaml and writing (async)");
  var yamlFileData = fs.readFileSync(yamlFilePath, "utf8");
  yamlFileData = yaml.load(yamlFileData);
  yamlFileData = JSON.stringify(yamlFileData, null, 4);
  return fs.writeFileSync(jsonFilePath, yamlFileData);
}

function jsonToYaml(jsonFilePath, yamlFilePath) {
  return fs.readFile(jsonFilePath, "utf8")
    .then(JSON.parse)
    .then(yaml.dump)
    .then(function(yamlData) {
      debug("converting json and writing");
      return fsasync.writeFile(yamlFilePath, yamlData)
    });
}

function jsonToYamlAsync(jsonFilePath, yamlFilePath) {
  debug("converting json and writing (async)");
  var jsonFileData = fs.readFileSync(jsonFilePath, "utf8");
  jsonFileData = JSON.parse(jsonFileData);
  jsonFileData = yaml.dump(jsonFileData);
  return fs.writeFileSync(yamlFilePath, jsonFileData);
}

var projectDir = process.cwd();
var jsonFilePath = path.join(process.cwd(), "package.json");

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
  yamlToJsonAsync(ymlOrYamlFilePath, jsonFilePath)
} else {
  jsonToYamlAsync(jsonFilePath, ymlFilePath);
}

process.on('exit', function() {
  if (ymlOrYamlFilePath) {
    var jsonFileExists = fs.existsSync(jsonFilePath);
    if (jsonFileExists) {
      jsonToYamlAsync(jsonFilePath, ymlOrYamlFilePath);
    }
  }
});
