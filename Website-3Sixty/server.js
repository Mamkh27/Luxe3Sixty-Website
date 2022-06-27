const express = require("express");
const app = express();
const port = 3000; // you need to put your port number here

const user1 = {
  name: "John Doe",
  email: "luxe3sixty@gmail.com",
  eventType: "reception",
  eventAddress: "1000 Del Paso Rd",
  hoursBooked: 5,
  depositPaid: 250.5,
  remainingTotal: 450.5,
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api", (req, res) => {
  res.json(user1);
});
app.get("/booking.html", (req, res) => {
  res.sendFile(__dirname + "/booking.html");
});
function fileNotFound(req, res) {
  let url = req.url;
  res.type("text/plain");
  res.status(404);
  res.send("Cannot find " + url);
}

app.use(express.static("public")); // can I find a static file?
// app.get("/query", queryHandler); // if not, is it a valid query?
// app.post('/addUserInfo', (request, response) => {
//   db.collection('Bookings').insertOne({ home: 'address', hours: 2 }).then(result => { console.log("We are booked.") response.redirect('/')})
// }
app.use(fileNotFound); // otherwise not found

app.listen(process.env.port || port, function () {
  console.log("Listening...");
});

/*
function queryHandler(req, res, next) {
  let url = req.url;
  let qObj = req.query;
  console.log(qObj);
  if (qObj.word != undefined) {
    //code for palindrome
    var init = qObj.word;
    var str = qObj.word;
    str = str.split(""); //convert 'jQuery' to array
    str = str.reverse(); //reverse 'jQuery' order
    str = str.join(""); //then join the reverse order values together
    qObj.word = init + str;

    res.json({ palindrome: qObj.word });
  } else {
    next();
  }
}
*/
