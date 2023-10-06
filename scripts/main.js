//DOM elements
let container = document.getElementById("ticketCardsContainer");
let labelTotal = document.getElementById("lblTotal")
let lblChange = document.getElementById("lblChange")
let amountOfMoneyGiven = document.getElementById("amountOfMoneyGivenInput");

//Available items
const itemsList = [
  { name: "Pizza", price: 2.00, img: "media/pizza.png" },
  { name: "Hot dog", price: 1.50, img: "media/hotdog.png" },
  { name: "Frozen", price: 1.50, img: "media/frozen.png" },
  { name: "Soda", price: 0.75, img: "media/sodas.png" },
  { name: "Agua", price: 0.50, img: "media/agua.png" },
  { name: "Jugos", price: 0.60, img: "media/jugos.png" },
];

//control variables
let total = 0.0
let moneyGiven = 0.0

//creating a card for each item on the items list
for (let index = 0; index < itemsList.length; index++) {
  const item = itemsList[index];
  container.innerHTML += `<div class="cols col-12 col-sm-6 col-lg-3 mb-4">
    <div class="card">

      <!-- picture -->
      <img src="${item.img}" class="card-img-top" alt="${item.name}">

      <div class="card-body">
        <!-- textutal details -->   
        <h5 class="card-title text-center">${item.name}</h5>
        <p class="card-text text-center text-success fw-bold">${toUSDFormat(item.price)} c/u</p>

        <!-- card actions -->
        <div class="input-group mb-2">
          <a class="btn btn-danger fw-bold" id="btn-minus-${index}" href="#" role="button" onclick="deleteProduct(event,'input-${index}', ${item.price})">-</a>
          <input readonly type="number" id="input-${index}" value="0" min="0" pattern="^[0-9]*$" class="form-control fw-bold fs-4 text-center"
            aria-describedby="basic-addon1">
          <a class="btn btn-primary fw-bold" id="btn-plus-${index}" href="#" role="button" onclick="addProduct(event,'input-${index}', ${item.price})">+</a>
        </div>
      </div>
    </div>
  </div>`;
}

//logic
function addProduct(event, idInput, selectedItemPrice) {
  event.preventDefault();
  let input = document.getElementById(idInput);
  input.value++;
  total += parseFloat(selectedItemPrice)
  labelTotal.innerText = `${toUSDFormat(total.toFixed(2))} ${currencyType(total.toFixed(2))}`

  updateChange()
}

function deleteProduct(event, idInput, selectedItemPrice) {
  event.preventDefault();
  let input = document.getElementById(idInput);
  if (input.value > 0) {
    input.value--;
    total -= parseFloat(selectedItemPrice)
    labelTotal.innerText = `${toUSDFormat(total.toFixed(2))} ${currencyType(total.toFixed(2))}`

    updateChange()
  }
}

function toUSDFormat(str) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return formatter.format(str)
}

function currencyType(amount) {
  if (amount == 1.00) {
    return 'dólar'
  }

  if (amount < 1.00 && amount > 0) {
    return 'centavos'
  }

  return 'dólares'
}

function resetCalculations() {
  location.reload()
}

function updateChange() {
  if (moneyGiven != null && moneyGiven > -1 && !isNaN(parseFloat(moneyGiven))) {
    let changeToGive = parseFloat(moneyGiven) - parseFloat(total)

    //Alert
    if (moneyGiven == 0) {
      lblChange.innerHTML = `
      <div class="card border-warning mb-1 mt-3">
        <div class="card-header"><span class="fw-bold">¡Alerta!</span></div>
          <div class="card-body"> 
            <p class="card-text">Debe ingresar la cantidad de dinero otorgada por el cliente para poder calcular el vuelto.</p>
          </div>
      </div>
      `
      return
    }

    //Alert
    if (changeToGive.toFixed(2) < 0) {
      lblChange.innerHTML = `
      <div class="card text-bg-danger mb-1 mt-3">
        <div class="card-header"><span class="fw-bold">¡Alerta!</span></div>
          <div class="card-body">
          <h5 class="card-title">Dinero insuficiente</h5>
            <p class="card-text">El monto otorgado por el cliente es menor a monto total debitado. <span class="fw-bold">(${toUSDFormat(total.toFixed(2))} dólares)</span></p>
            <hr>
            <p class="card-text"><span class="fw-bold"> Dinero faltante: ${toUSDFormat(total.toFixed(2) - moneyGiven)} ${currencyType(total.toFixed(2) - moneyGiven)}</span></p>
          </div>
      </div>
      `
      return
    }

    //Change if every condition is met
    lblChange.innerHTML = `<p class="fw-bold mt-0 fs-1 text-danger" >${toUSDFormat(changeToGive.toFixed(2))} ${currencyType(changeToGive.toFixed(2))}</p>`
  }
}

//events
amountOfMoneyGiven.addEventListener('input', (event) => {
  moneyGiven = event.target.value;
  updateChange()
});

