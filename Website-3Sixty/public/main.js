// const { type } = require("express/lib/response");

const bookBtn = document.getElementById("reserveID");
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
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    fillInfo(data);
  } catch (error) {
    console.log(error);
  }
}

function fillInfo(client) {
  document.getElementById("client-name").innerHTML = client.name.toUpperCase();
  document.getElementById("client-email").innerHTML =
    client.email.toUpperCase();
  document.getElementById("event-type").innerHTML = client.type.toUpperCase();
  document.getElementById("event-address").innerHTML =
    client.address.toUpperCase();
  document.getElementById("hours-booked").innerHTML = client.hours;
  document.getElementById("deposit-paid").innerHTML =
    "$" + client.deposit.toFixed(2);
  document.getElementById("remaining-total").innerHTML =
    "$" + client.remaining.toFixed(2);
  document.getElementById("deposit-h1").innerHTML =
    "$" + client.deposit.toFixed(2);

  document.querySelector(".name-contract span").textContent =
    client.name.toUpperCase();
  document.querySelector(".date-contract span").textContent =
    client.date.toUpperCase();
  document.querySelector(".address-contract span").textContent =
    client.address.toUpperCase();
  document.querySelector(".type-contract span").textContent =
    client.type.toUpperCase();
  document.querySelector(".start-contract").textContent = client.start;
  document.querySelector(".end-contract").textContent = client.end;
  document.querySelector(".remaining-contract span").textContent =
    client.remaining.toFixed(2);
  document.querySelector(".deposit-contract span").textContent =
    client.deposit.toFixed(2);
  const total = (client.remaining + client.deposit).toFixed(2);
  document.querySelector(".total-contract span").textContent = total;
}
// document.getElementById(
//   "contract-name"
// ).textContent.innerHTML = `<span>${client.name}</span>`;
// document.getElementById(
//   "contract-start"
// ).textContent.innerHTML = `<span>${client.start}</span>`;
// document.getElementById(
//   "contract-end"
// ).textContent.innerHTML = `<span>${client.end}</span>`;

// document.getElementById("contract-total").textContent.innerHTML = `<span>${(
//   client.remaining + client.deposit
// ).toFixed(2)}</span>`;

// document.getElementById(
//   "contract-date"
// ).textContent.innerHTML = `<span>${client.date}</span>`;
// document.getElementById(
//   "contract-type"
// ).textContent.innerHTML = `<span>${client.type}</span>`;

// document.getElementById(
//   "contract-address"
// ).textContent.innerHTML = `<span>${client.address}</span>`;

// document.getElementById(
//   "contract-remaining"
// ).textContent.innerHTML = `<span>${client.remaining}</span>`;

// document.getElementById(
//   "contract-deposit"
// ).textContent.innerHTML = `<span>${client.deposit}</span>`;
