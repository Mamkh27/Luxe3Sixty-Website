const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const port = 3000; // you need to put your port number here
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
//database demo
// let db,
//   dbConnectionStr = process.env.DB_STRING,
//   dbName = "luxe-db";

// MongoClient.connect(dbConnecionStr, { useUnifiedTopology: true }).then(
//   (client) => {
//     console.log(`Connected to ${dbName} Database`);
//     db = client.db(dbName);
//   }
// );

//e-mail demo

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
app.get("/booking.html", (req, res) => {
  res.sendFile(__dirname + "/public/booking.html");
});

app.post("/newuser", (req, res) => {
  const bookingObj = req.body;

  const name = bookingObj["clientName"];
  const email = bookingObj["userEmail"];
  const date = bookingObj["eventDate"];
  const type = bookingObj.eventType;
  const address = bookingObj.eventAddress;
  const hours = bookingObj.hoursBooked;
  const total = bookingObj.quoteValue;
  const deposit = bookingObj.depositValue;
  const remaining = total - deposit;

  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "luxe3sixty@gmail.com",
      pass: "brojjmkzwyridqut",
    },
    secure: true,
  });

  const msg = {
    from: "Luxe3Sixty Portal < luxe3sixty@gmail.com>",
    to: "luxe3sixty@gmail.com",
    subject: `New Booking for ${date}`,
    text: `You have recieved a new booking! Here are the details: \n Client Name: ${name}\n Client Email: ${email} \n Event Date: ${date}\n Event Address: ${address} \n Event Type: ${type}\n Amount of hours: ${hours} \n Total Amount: ${total}\n Deposit: ${deposit} \n Remaining Due 1 Week Before: ${remaining}`,
    // "\n" +
    // "Client E-mail: " +
    // "\n" +
    // "Event Type: " +
    // type +
    // "\n" +
    // "Venue Address: " +
    // address +
    // "\n" +
    // "Hours Booked: " +
    // hours +
    // "\n" +
    // "Total Amount " +
    // quote +
    // "\n" +
    // "Deposit Paid: " +
    // deposit +
    // "\n",
  };
  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent" + info.response);
    }
  });

  res.json(user1);
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
