const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const port = 3000; // you need to put your port number here
require("dotenv").config();

app.use(cors());

// // //Mongo DB
// let db,
//   dbConnectionStr = process.env.DB_STRING,
//   dbName = "luxe-db";

// MongoClient.connect(dbConnecionStr, { useUnifiedTopology: true }).then(
//   (client) => {
//     console.log(`Connected to ${dbName} Database`);
//     db = client.db(dbName);
//   }
// );

const user1 = {
  name: "John Doe",
  email: "luxe3sixty@gmail.com",
  type: "reception",
  address: "1000 Del Paso Rd",
  hours: 5,
  deposit: 250.5,
  remaining: 450.5,
  date: "June 25, 2022",
  start: "6:00PM",
  end: "8:00PM",
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/bookedinfo", (req, res) => {
  res.json(user1);
});

app.post("/newuser", (req, res) => {
  db.collection("Users")
    .insertOne({ name: req.body.clientName })
    .then((result) => {
      console.log("Added to database");
    });
});

app.get("/booking.html", (req, res) => {
  res.sendFile(__dirname + "/public/booking.html");
});
function fileNotFound(req, res) {
  let url = req.url;
  res.type("text/plain");
  res.status(404);
  res.send("Cannot find " + url);
}

app.use(express.static("public")); // can I find a static file?
app.use(fileNotFound); // otherwise not found

app.listen(process.env.PORT || port, function () {
  console.log("Listening...");
});
