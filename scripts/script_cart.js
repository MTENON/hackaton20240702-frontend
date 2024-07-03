// var moment = require('moment');
const link = "http://localhost:3000";

console.log('Script_cart loaded');

function addListeners() {
    for (let index = 0; index < document.querySelectorAll('.item').length; index++) {
        document.querySelectorAll('.item')[index].addEventListener('click', function () {

        })
    }

    document.querySelector('#purchase').addEventListener('click', function () {

        fetch(`${link}/myCart/bookCart/`).then(response => response.json())
            .then((data) => {
                console.log(data);
            })
    })
}

function getCart() {
    //Fetch un objet du cart
    fetch(`${link}/myCart/`)
        .then(response => response.json())
        .then((data) => {

            console.log(data);
            document.querySelector('.totalprice').textContent = `${data.price}€`

            for (let i = 0; i < data.result.length; i++) {
                document.querySelector('#mycart').innerHTML += `
                <div class="item">
                    <div class="flexline">
                        <p class="cart_departure">${data.result[i].departure}</p>
                        <p class="cart_flex_left">></p>
                        <p class="cart_arrival">${data.result[i].arrival}</p>
                    </div>
                    <p class="cart_hour">${data.hour[i]}</p>
                    <p class="cart_price">${data.result[i].price}€</p>
                    <button class="cart_delete">X</button>
                </div>
                `;
            }
            addListeners();
        })
}

//Initialisation
getCart();
addListeners();