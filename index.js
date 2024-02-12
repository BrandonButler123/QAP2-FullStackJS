const http = require("http");
const fs = require("fs");

global.DEBUG = true;

// Define the routes
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/contact": "contact.html",
  "/products": "products.html",
  "/subscribe": "subscribe.html",
};

const server = http.createServer((req, res) => {
  const url = req.url;

  // Determine the route
  const route = routes[url];

  if (route) {
    console.log(`Accessed route: ${url}`);

    // Read the HTML file from the 'views' directory
    fs.readFile(`./views/${route}`, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }

      // Send the HTML response
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

    // Emit the server activity event
    // You'll implement this part later
  } else {
    // Handle 404 Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3010;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
