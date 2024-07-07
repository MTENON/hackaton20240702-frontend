// var moment = require('moment');
const link = "hackaton20240702-backend.vercel.app";

console.log('Script_cart loaded');

function hideText() {

}

function addListeners() {

    document.querySelector('#purchase').addEventListener('click', function () {

        fetch(`${link}/myCart/bookCart/`).then(response => response.json())
            .then((data) => {
                // console.log(data);
                location.assign('./page_booking.html')
            })
    })

    //En appuyant sur la croix retire la ligne clickée
    //Retire l'objet de la DB MyCart
    //Met à jour le total
    for (let i = 0; i < document.querySelectorAll('.cartDelete').length; i++) {
        document.querySelectorAll('.cartDelete')[i].addEventListener('click', function () {

            const query = {
                departure: this.parentNode.firstElementChild.firstElementChild.textContent,
                arrival: this.parentNode.firstElementChild.lastElementChild.textContent,
                price: this.previousElementSibling.firstElementChild.textContent,
            }

            this.parentNode.remove();
            if (document.querySelectorAll('.cartDelete').length === 0) {
                document.querySelector('#notickets').style = "display: block";
                document.querySelector('#mycart2').style = 'display: none'
            }

            fetch(`${link}/myCart/`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(query)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        })
    }

}

function getCart() {
    //Fetch un objet du cart
    fetch(`${link}/myCart/`)
        .then(response => response.json())
        .then((data) => {

            console.log(data);

            document.querySelector('.totalprice').textContent = `Total: ${data.price}€`

            //Faire disparaitre le texte qui sert à rien
            if (data.result.length === 0) {
                document.querySelector('#mycart2').style = "display: none";
                return;
            }

            document.querySelector('#notickets').style = "display: none";

            for (let i = 0; i < data.result.length; i++) {
                document.querySelector('#mycart').innerHTML += `
                <div class="item">
                    <div class="flexline">
                        <p class="cart_departure">${data.result[i].departure}</p>
                        <p class="cart_flex_left">></p>
                        <p class="cart_arrival">${data.result[i].arrival}</p>
                    </div>
                    <p class="cart_hour">${data.hour[i]}</p>
                    <div class="cart_price_container">
                        <p class="cart_price">${data.result[i].price}</p>
                        <p>€</p>
                    </div>
                    <button class="cartDelete">X</button>
                </div>
                `;
            }
            addListeners();
        })
}


//Initialisation
getCart();
addListeners();