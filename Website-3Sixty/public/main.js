// const { type } = require("express/lib/response");

const bookBtn = document.getElementById("submit");
bookBtn.addEventListener("click", apiRequest);

async function apiRequest() {
  //   const name = document.getElementById("").value;
  //   const type = document.getElementById("").value;
  const date = document.getElementById("myID").value;
  const address = document.getElementById("venue-address").value;
  //   const email = document.getElementById("").value;
  // const hours = document.getElementById("").value;
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;
  const quote = document.getElementById("quote-value").value;
  const deposit = quote * 0.25;
  //   const remaining = document.getElementById("").value;
  try {
    const response = await fetch("https://luxe3sixty.herokuapp.com/newuser", {
      method: "POST",
      body: JSON.stringify({
        clientName: "John Doe",
        eventType: "Engagement Party",
        eventDate: date,
        eventAddress: address,
        userEmail: "email@email.com",
        hoursBooked: 3,
        quoteValue: quote,
        depositValue: deposit,
        // remainingTotal: remaining,
      }),
    });
    const data = await response.json();
    console.log(data);
    //const client = JSON.parse(data);
    fillSummary(data);
  } catch (error) {
    console.log(error);
  }
}

function fillSummary(client) {
  document.getElementById("client-name").innerHTML = client.name;
  document.getElementById("client-email").innerHTML = client.email;
  document.getElementById("event-type").innerHTML = client.type;
  document.getElementById("event-address").innerHTML = client.address;
  document.getElementById("hours-booked").innerHTML = client.hours;
  document.getElementById("deposit-paid").innerHTML = client.deposit;
  document.getElementById("remaining-total").innerHTML = client.remaining;
}
