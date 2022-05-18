src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
const factor = 0.621371;
var differenceInMiles = 0;

function getQuoteBtnPressed() {
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

//Reservation Javascript
function reserveBtnPressed() {
  document.getElementById("blackout").style.display = "block";
  document.getElementById("terms").style.display = "block";
  document.getElementById("checkbox-div").style.display = "block";
}
