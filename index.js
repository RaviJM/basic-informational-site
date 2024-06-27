const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 8080;

server = http.createServer((req, res) => {
  const URL = url.parse(req.url, true);

  let fileName = "";

  switch (URL.pathname) {
    case "/":
      fileName = "index.html";
      break;
    case "/about":
      fileName = "about.html";
      break;
    case "/contact-me":
      fileName = "contact-me.html";
      break;
    case "/favicon.ico":
      // Handle favicon.ico requests separately
      res.writeHead(204); // No Content
      res.end();
      return;
      break;
    default:
      fileName = "404.html";
      break;
  }

  let filePath = path.join(__dirname, fileName);

  try {
    const content = fs.readFileSync(filePath, "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.write(err.toString());
  }

  res.end();
});

server.listen(PORT);
