// var moment = require('moment');
const link = "https://hackaton20240702-backend.vercel.app";

console.log("Script_booking loaded");

function getBook() {
  //Fetch un objet du book
  fetch(`${link}/myCart/bookedCart`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      if (data.data.length === 0) {
        return;
      }

      //Ajouter InnerHTML
      document.querySelector("#nobooks").style = "display: none";

      for (let i = 0; i < data.data.length; i++) {
        document.querySelector("#my").innerHTML += `
                <div class="item">
                    <div class="flexline">
                        <p class="cart_departure">${data.data[i].departure}</p>
                        <p class="cart_flex_left">></p>
                        <p class="cart_arrival">${data.data[i].arrival}</p>
                    </div>
                    <p class="cart_hour">${data.hour[i]}</p>
                    <p class="cart_price">${data.data[i].price}€</p>
                    <p class="cart_hour_left">Departure in ${data.leftHours[i]} hours</p>
                `;
      }
    });
}

//Initialisation
getBook();
