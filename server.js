const http = require("http");
const URL = require("url");
const {adduser, getusers} = require("./addUser");

const server = http.createServer(function (req, res) {
    const data = [
        { name: "Tade", age: 10 },
        { name: "Solape", age: 40 },
        { name: "Agunyi", age: 36 },
    ];
    if (req.url == "/") {
        res.writeHead(200, { Content_Type: "text/html" });
        res.write("welcome");
        res.end();
    } 
    else if (req.url == "/users") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { Content_Type: "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } 
    else if (req.url == "/adduser?username=ben&age=15") {
        const newUrl = URL.parse(req.url, true);
        const params = newUrl.query;
        let u_name = params.username;
        let u_age = params.age;
        adduser(u_name, u_age);
        res.end("record added");
    }
    else if (req.url.startsWith("/addNewUser")) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { Content_Type: "application/json" });
        const newUrl = URL.parse(req.url, true);
        const params = newUrl.query;
        let u_name = params.username;
        let u_age = params.age;
        adduser(u_name, u_age);
        res.end("record added Succesfully");
    } 
    else if (req.url == "/getUsers") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { Content_Type: "application/json" });
        let userslist = getusers();
        res.write(JSON.stringify(userslist));
        res.end("\n\nrecords successfully retrieved");
    } 
    else if (req.url == "/contact") {
        res.writeHead(200, { Content_Type: "text/html" });
        res.write("contact page");
        res.end();
    } 
    else {
        res.writeHead(404, { Content_Type: "text/html" });
        res.end();
    }
});
server.listen(5000, function () {
    console.log("Server running");
});
