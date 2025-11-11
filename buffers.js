
const fs = require("fs");

const requestHandler=((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>Enter Your Detail</h1>");
    res.write("<form action='/submit' method='POST'>");

    res.write(
      "<input type='text' name='username' placeholder='username' ><br>"
    );
    res.write("<label for='gender'>Gender:</label>");
    res.write("<input type='radio' id='male' name='gender' value='male'>");
    res.write("<label for='male'>Male:</label>");
    res.write("<input type='radio' id='female' name='gender' value='female'>");
    res.write("<label for='female'>Female:</label> ");
    res.write("<button type='submit'>Submit</button>");

    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    const body = [ ];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const fullbody = Buffer.concat(body).toString();
      console.log(fullbody);
      const prams = new URLSearchParams(fullbody);
      // const bodyObject = {};
      // for (const [key, val] of prams.entries()) {
      //   bodyObject[key] = val;
      // }

      const bodyObject=Object.fromEntries(prams);   
        console.log(bodyObject);
       fs.writeFileSync("user.txt", JSON.stringify(bodyObject));
    
    });

    // fs.writeFileSync("user.txt", "fatima Basheer");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Complete Coding</title></head>");
    res.write("<body><h1>404 error</h1></body>");
    res.write("</html>");
    res.end();
  }
});

//server.listen(3000);

module.exports=requestHandler;