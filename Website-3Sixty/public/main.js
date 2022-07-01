const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", apiRequest);

const bookBtn = document.getElementById("reserveID");
bookBtn.addEventListener("click", fillClientInfo);
submitBtn.addEventListener("click", pdfDownload);

async function apiRequest() {
  let date = document.getElementById("myID").value;
  let address = document.getElementById("venue-address").value;
  let start = document.getElementById("start-time").value;
  let end = document.getElementById("end-time").value;
  let quote = document.getElementById("quote-value-id").textContent;
  quote = quote.substring(1);
  let deposit = (parseFloat(quote) * 0.25).toFixed(2);
  const name = document.getElementById("name-contract").value;
  const type = document.getElementById("type-contract").value;
  const email = document.getElementById("email-2-contract").value;

  var booking = JSON.stringify({
    clientName: name,
    eventType: type,
    eventDate: date,
    eventAddress: address,
    userEmail: email,
    hoursBooked: 3,
    quoteValue: quote,
    depositValue: deposit,
    startTime: start,
    endTime: end,
  });

  try {
    const response = await fetch("https://luxe3sixty.herokuapp.com/newuser", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        clientName: name,
        eventType: type,
        eventDate: date,
        eventAddress: address,
        userEmail: email,
        hoursBooked: 3,
        quoteValue: quote,
        depositValue: deposit,
        startTime: start,
        endTime: end,
      }),
    });
    const data = await response.json();
    console.log(data);

    fillInfo(JSON.parse(booking));
  } catch (error) {
    console.log(error);
  }
}

function fillInfo(client) {
  document.getElementById("client-name").innerHTML =
    client.clientName.toUpperCase();
  document.getElementById("client-email").innerHTML =
    client.userEmail.toUpperCase();
  document.getElementById("event-type").innerHTML =
    client.eventType.toUpperCase();
  document.getElementById("event-address").innerHTML =
    client.eventAddress.toUpperCase();
  document.getElementById(
    "hours-booked"
  ).innerHTML = `${client.startTime} to ${client.endTime}`;
  document.getElementById("deposit-paid").innerHTML = `$${client.depositValue}`;
  document.getElementById(
    "remaining-total"
  ).innerHTML = `$${client.quoteValue}`;
  document.getElementById("deposit-h1").innerHTML = `$${client.depositValue}`;
}

function fillClientInfo() {
  document.querySelector(".date-contract span").textContent =
    document.getElementById("myID").value;
  document.querySelector(".address-contract span").textContent =
    document.getElementById("venue-address").value;

  document.querySelector(".start-contract").textContent =
    document.getElementById("start-time").value;
  document.querySelector(".end-contract").textContent =
    document.getElementById("end-time").value;

  document.querySelector(".deposit-contract span").textContent = (
    document.getElementById("quote-value-id").textContent * 0.25
  ).toFixed(2);

  document.querySelector(".total-contract span").textContent =
    document.getElementById("quote-value-id").textContent;

  document.querySelector(".remaining-contract span").textContent =
    document.getElementById(
      "quote-value-id".textContent -
        document.getElementById("quote-value-id").textContent * 0.25
    );
}

function pdfDownload() {
  var doc = new jsPDF();
  var specialElementHandlers = {
    "#editor": function (element, renderer) {
      return true;
    },
  };
  $("#submit").click(function () {
    doc.HTML($("#this-form").html(), 15, 15, {
      width: 170,
    });
    doc.save("sample-file.pdf");
  });
}
