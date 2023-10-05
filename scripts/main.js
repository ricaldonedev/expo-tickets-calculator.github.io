const array = [
    { name: "Pizza", price: 2.00, img: "media/pizza.png" },
    { name: "Hot dog", price: 1.50, img: "media/hotdog.png" },
    { name: "Frozen", price: 1.50, img: "media/frozen.png" },
    { name: "Soda", price: 0.75, img: "media/sodas.png" },
    { name: "Agua", price: 0.50, img: "media/agua.png" },
    { name: "Jugos", price: 0.60, img: "media/jugos.png" },
];

let total = 0.0

let container = document.getElementById("ticketCardsContainer");
let labelTotal = document.getElementById("lblTotal")

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    container.innerHTML += `<div class="cols col-12 col-sm-6 col-lg-3 mb-3 ticket-card">
    <div class="card">

      <!-- picture -->
      <img src="${element.img}" class="card-img-top" alt="${element.name}">

      <div class="card-body">
        <!-- textutal details -->   
        <h5 class="card-title text-center">${element.name}</h5>
        <p class="card-text text-center text-success fw-bold">${toUSDFormat(element.price)} c/u</p>

        <!-- card actions -->
        <div class="input-group mb-3">
          <a class="btn btn-primary" id="btn-minus-${index}" href="#" role="button" onclick="deleteProduct(event,'input-${index}', ${element.price})">-</a>
          <input type="number" id="input-${index}" value="0" min="0" pattern="^[0-9]*$" class="form-control" aria-label="Username"
            aria-describedby="basic-addon1">
          <a class="btn btn-primary" id="btn-plus-${index}" href="#" role="button" onclick="addProduct(event,'input-${index}', ${element.price})">+</a>
        </div>
      </div>
    </div>
  </div>`;
}

function addProduct(event, idInput, selectedItemPrice) {
    event.preventDefault();
    let input = document.getElementById(idInput);
    input.value++;
    total += parseFloat(selectedItemPrice)
    labelTotal.innerText = `${toUSDFormat(total.toFixed(2))}`
}

function deleteProduct(event, idInput, selectedItemPrice) {
    event.preventDefault();
    let input = document.getElementById(idInput);
    if (input.value > 0) {
        input.value--;
        total -= parseFloat(selectedItemPrice)
        labelTotal.innerText = `${toUSDFormat(total.toFixed(2))}`
    }
}

function toUSDFormat(str) {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    return formatter.format(str)
}
