src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
const factor = 0.621371;
var differenceInMiles = 0;

function getQuoteBtnPressed() {
  document.getElementById("sign").style.color = "white";
  max = 55;
  let anim = setInterval(() => {
    if (value == max) {
      clearInterval(anim);
    } else {
      value += 1;
      progressBar.value = value;
      progressBarValue.innerText = value + "%";
    }
  }, 80);
  let address = document.getElementById("venue-address").value;
  let homeaddress = {
    latitude: 38.684292,
    longitude: -121.535684,
  };
  // conversion factor

  console.log("button pressed");
  console.log(`User address is ${address}`);

  //address geocoding
  let start = document.getElementById("start-time").value; //to update time value in each input bar
  let end = document.getElementById("end-time").value;
  let date = document.getElementById("myID").value;
  if (!address) {
    document.getElementById("address-error-msg").style.display = "block";
  } else {
    document.getElementById("address-error-msg").style.display = "none";
  }
  if (!start) {
    document.getElementById("start-time-error-msg").style.display = "block";
  } else {
    document.getElementById("start-time-error-msg").style.display = "none";
  }
  if (!end) {
    document.getElementById("end-time-error-msg").style.display = "block";
  } else {
    document.getElementById("end-time-error-msg").style.display = "none";
  }
  if (!date) {
    document.getElementById("date-error-msg").style.display = "block";
  } else {
    document.getElementById("date-error-msg").style.display = "none";
  }
  if (address && start && end && date) {
    $.ajax({
      url: "https://api.positionstack.com/v1/forward",
      data: {
        access_key: "d8ace25125b394dca1d0f92da3a00ee8",
        query: address,
        limit: 1,
      },
    })
      .done(function (data) {
        console.log("Now printing...");

        // Find the mileage between home and inputed address
        differenceInMiles =
          factor *
            calcCrow(
              homeaddress.latitude,
              homeaddress.longitude,
              JSON.stringify(data.data[0][`latitude`]),
              JSON.stringify(data.data[0][`longitude`])
            ) +
          5;
        console.log(
          `The amount of miles between the home address and ${address} is ${differenceInMiles}`
        );

        updateQuote();
        document.getElementById("total-summary").style.display = "block";
        document.getElementById("reserveID").style.display = "block";
        window.scrollTo(0, document.body.scrollHeight);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        document.getElementById("address-error-msg").style.display = "block";
      });
  }
}

//update quote based on hours and travel fee
function updateQuote() {
  let totalFee = totalHoursbooked * 160;
  let totalMileageCost = 2 * (differenceInMiles * 0.65);
  let cost = totalFee + totalMileageCost;
  document.getElementById("quote-value").innerHTML = `$${cost.toFixed(2)}`;
  document.getElementById("hourly-fee").innerHTML = `$${totalFee.toFixed(2)}`;
  document.getElementById("miles-fee").innerHTML = `$${totalMileageCost.toFixed(
    2
  )}`;
}
function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

//server-client code
("strict mode");

// Do a CORS request
function createAJAXRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  return xhr;
}

// Make the actual CORS request.
function makeAJAXRequest() {
  var nameValue = document.getElementById("word").value;
  let url = `query?word=${nameValue}`;
  let xhr = createAJAXRequest("GET", url);

  if (!xhr) {
    alert("Something happened, ERROR");
    return;
  }

  xhr.onload = function () {
    let responseStr = xhr.responseText; // get the JSON string
    let object = JSON.parse(responseStr); // turn it into an object
    document.getElementById("outputGoesHere").textContent =
      object["palindrome"];
  };

  xhr.onerror = function () {
    alert("Woops, there was an error making the request.");
  };

  xhr.send();
}
// Actually send request to server

// run this code to make request when this script file gets executed
//makeAJAXRequest();
