// QAP #2 for FullStack JS
// Author: Brandon Buter
// Date: 2024-02-12
// Description: This is a simple web server that serves HTML files for different routes.
// It uses the Node.js built-in http module to create the server and the built-in fs module
// to read the HTML files.

const http = require("http");
const fs = require("fs");
const EventEmitter = require("events");
const myEmitter = new EventEmitter();

global.DEBUG = false;

// Define the routes
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact.html",
  "/products": "products.html",
  "/subscribe": "subscribe.html",
};

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;
  // Determine the route
  const route = routes[url];

  if (route) {
    // EVENT SCENARIO & DESCRIPTION: Everytime a specific route is accessed, a message is logged ot the console indicating the specific route was accessed.
    console.log(`Accessed route: ${url}`);
    // Read the HTML file from the 'views' directory
    fs.readFile(`./views/${route}`, "utf8", (err, data) => {
      if (err) {
        // EVENT SCENARIO & DESCRIPTION: If there is an error reading the file, a 500 Internal Server Error is returned to the client.
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      // Send the HTML response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else {
    // EVENT SCENARIO & DESCRIPTION: If the specified route is not found, a 404 error is returned to the client.
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Initialize the event emitter
myEmitter.on("server-started", (port) => {
  const logMessage = `Server started on port ${port} at ${new Date()}\n`;
  // Log to the console
  if (DEBUG) console.log(logMessage);
  // Log to a file
  fs.appendFile("server.log", logMessage, (err) => {
    if (err) throw err;
    console.log("Log written to server.log");
  });
});

const PORT = 3010;
// Start the server
server.listen(PORT, () => {
  myEmitter.emit("server-started", PORT);
  console.log(`Server is listening on port ${PORT}`);
});
