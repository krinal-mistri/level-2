const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

var port = 5000;
const myArgs = minimist(process.argv.slice(2));
if (myArgs.port != undefined) port = myArgs.port;

console.log(port);

let HomeContent = "";
let RegistrationContent = "";
let projectContent = "";
let scriptContent = "";
let styleContent = "";
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  HomeContent = home;
});
fs.readFile("registration.html", (err, Registration) => {
  if (err) {
    throw err;
  }
  RegistrationContent = Registration;
});
fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "content-type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      case "/registration":
        response.write(RegistrationContent);
        response.end();
        break;
      case "/script":
        response.writeHeader(200, { "content-type": "text/js" });
        response.write(scriptContent);
        response.end();
        break;
      case "/style":
        response.writeHeader(200, { "content-type": "text/css" });
        response.write(styleContent);
        response.end();
        break;
      default:
        response.write(HomeContent);
        response.end();
        break;
    }
  })
  .listen(port);
