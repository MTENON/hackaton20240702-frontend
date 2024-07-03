// var moment = require('moment');
const link = "http://localhost:3000";

console.log('Script loaded');

//FUNCTIONS -------------------------
//Cette fonction affiche la loupe si la recherche est échouée
function failedSearch() {
    document.querySelector('#train').style = 'display: block';
    document.querySelector('#trait').style = 'display: block';
    document.querySelector('#book').style = 'display: block';
    document.querySelector('#train').src = "./images/notfound.png";
    document.querySelector('#book').textContent = "No trip found.";
}
//-----------------------------------

function clickSearch() {
    document.querySelector('#search').addEventListener('click', function () {

        //Supprimer la rechercher précédente
        const last = document.querySelectorAll('.item').length;
        for (let i = 0; i < last; i++) {
            document.querySelectorAll('.item')[0].remove();
        }

        if (document.querySelector("#inputdeparture").value != "" && document.querySelector("#inputarrival").value != "" && document.querySelector("#calendarbutton").value != "") {
            const query = {
                departure: document.querySelector('#inputdeparture').value,
                arrival: document.querySelector('#inputarrival').value,
                date: document.querySelector('#calendarbutton').value,
            }

            fetch(`${link}/myCart/search`, { //Le fetch renvoie un TRIP
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query);
            }).then(response => response.json())
                .then((data) => {
                    //Verifier que les données sont viables
                    console.log(data.result)
                    if (data) {
                        if (data.result.length === 0) {
                            failedSearch();
                            return;
                        }
                        //Ajouter InnerHTML
                        document.querySelector('#train').style = 'display: none';
                        document.querySelector('#trait').style = 'display: none';
                        document.querySelector('#book').style = 'display: none';

                        for (let i = 0; i < data.result.length; i++) {
                            document.querySelector('#resultblock').innerHTML +=
                                `<div class="item">
                                <div class="flexline">
                                    <p class="cart_departure">${data.result[i].departure}</p>
                                    <p class="cart_flex_left">></p>
                                    <p class="cart_arrival">${data.result[i].arrival}</p>
                                </div>
                                <div class="cart_date" style="display:none">${data.result[i].date}</div>
                                <p class="cart_hour">${data.hour[i]}</p>
                                <p class="cart_price">${data.result[i].price}€</p>
                                <button class="book">Book</button>
                            </div>`;
                        }

                    } else {
                        failedSearch();
                    }
                    bookButton();
                })
        } else {
            failedSearch();
        }

    })
}

function bookButton() {
    for (let i = 0; document.querySelectorAll('.book').length; i++) {
        document.querySelectorAll('.book')[i].addEventListener('click', function () {

            console.log("click");

            const query = {
                departure: this.parentNode.firstElementChild.firstElementChild.textContent,
                arrival: this.parentNode.firstElementChild.firstElementChild.nextElementSibling.nextElementSibling.textContent,
                date: this.previousElementSibling.previousElementSibling.previousElementSibling.textContent,
            }

            // console.log(query);

            fetch(`${link}/myCart/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query)
            }).then(response => response.json())
                .then((data => {
                    console.log(data)
                }))
            //Aller dans la page page_cart
            // location.assign('./page_cart.html')

        });
    }
}
//window.location.href = '...';
//location.assign
clickSearch();