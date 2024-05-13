const http = require("http");
const os = require('node:os');
let info = os.cpus()
let data = {
   OS: os.type(),
   version: os.version(),
   CPU_model: info[0].model,
   CPU_speed: info[0].speed
}

const server = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setTimeout(2000, () => {
        console.log("Timeout! Delayed for 2 seconds")
   
    if (req.url == "/") {
        res.writeHead(200, { Content_Type: "text/html" });
        res.write("welcome to the homepage");
        res.end();
    } 
    else if (req.url == "/getinfo") {  
        res.writeHead(200, { Content_Type: "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url == "/contact") {
        res.writeHead(200, { Content_Type: "text/html" });
        res.write("contact page");
        res.end();
    } 
    else {
        res.writeHead(404, { Content_Type: "text/html" });
        res.write("NOT FOUND!!!");
        res.end();
    }
})
});

server.listen(5000, '127.0.0.1', function () {
    console.log("Server running");
});
