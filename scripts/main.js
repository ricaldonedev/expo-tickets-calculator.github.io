//DOM elements
let container = document.getElementById("ticketCardsContainer");
let containerSm = document.getElementById("ticketCardsContainerSm");
let resetButton = document.getElementById("resetButton")
let labelTotal = document.getElementById("lblTotal")
let lblChange = document.getElementById("lblChange")
let amountOfMoneyGiven = document.getElementById("amountOfMoneyGivenInput");
let simpleSummaryContainer = document.getElementById('selectedItemsSimpleSummaryContainer');
let navYear = document.getElementById("navYear")

navYear.innerText = new Date().getFullYear();
//Available items
let selectedItemsIds = [];
let selectedArticlesWithAmount = []
const itemsList = [
  //comida normal
  { id: 1, name: "Desayuno", price: 2.25, img: "media/desayuno.png" },
  { id: 2, name: "Almuerzo", price: 3.50, img: "media/almuerzo.jpg" },
  { id: 3, name: "Pupusa", price: 1.00, img: "media/pupusas.png" },
  { id: 4, name: "Panini con papas", price: 2.00, img: "media/panini.png" },
  { id: 5, name: "Burrito", price: 2.50, img: "media/burrito.png" },

  //chucherias
  { id: 6, name: "Pizza", price: 1.50, img: "media/pizza.png" },
  { id: 7, name: "Hot dog", price: 1.50, img: "media/hotdog.png" },
  { id: 8, name: "Hambur. con papas", price: 3.00, img: "media/hamburguesa.png" },
  { id: 9, name: "Orden de nachos", price: 2.50, img: "media/nachos.png" },
  { id: 10, name: "Churros españoles", price: 1.75, img: "media/churro.jpg" },
  { id: 11, name: "Papas fritas", price: 1.75, img: "media/papas.png" },
  { id: 12, name: "Frozen", price: 1.50, img: "media/frozen.png" },
  { id: 13, name: "Chocobanano", price: 1.25, img: "media/chocobanano.png" },
  { id: 14, name: "Minuta", price: 1.50, img: "media/minuta.png" },
  { id: 15, name: "Dona", price: 1.00, img: "media/dona.png" },
  { id: 16, name: "Cupin", price: 1.50, img: "media/cupin.png" },

  //bebidas
  { id: 17, name: "Sodas / Jugos", price: 1.00, img: "media/sodas.png" },
  { id: 18, name: "Agua", price: 0.75, img: "media/agua.png" },
  { id: 19, name: "Café", price: 0.50, img: "media/cafe.png" },
];

//control variables
let total = 0.0
let moneyGiven = 0.0
let simpleSummayColumnCount = 0

function showInSimpleList() {
  // Reset the column count
  simpleSummayColumnCount = 0;

  // Clear the container
  simpleSummaryContainer.innerHTML = '';

  let column; // Declare column here
  selectedArticlesWithAmount.forEach(function (item) {
    if (simpleSummayColumnCount % 1 === 0) {
      // Create a new column
      column = document.createElement('div');
      column.className = 'col-6';
      if (simpleSummaryContainer) {
        simpleSummaryContainer.appendChild(column);
      }
    }

    // Create a new item
    let listItem = document.createElement('div');
    listItem.className = 'list-group-item d-flex align-items-center mb-2 me-2';
    listItem.innerHTML = '<span class="badge bg-warning text-dark rounded-pill me-2 fw-bold fs-5">' + item.count + '</span><p class="fw-bold fs-6 mb-0">' + item.name + '</p>';

    // Check if column is defined before appending to it
    if (column) {
      // Add the item to the current column
      column.appendChild(listItem);
    } else {
      // If column is not defined, append listItem to the last column
      let lastColumn = simpleSummaryContainer.lastChild;
      if (lastColumn) {
        lastColumn.appendChild(listItem);
      }
    }

    simpleSummayColumnCount++;
  });
}
let totalSelected = 0
function totalCountOfTickets() {
  totalSelected = selectedArticlesWithAmount.reduce((total, article) => total + article.count, 0);
}

loadItems()

// Store the initial window width
let windowWidth = window.innerWidth;

// Function to handle the resize event
function handleResize() {
  // Check if the window width has changed significantly
  if (Math.abs(window.innerWidth - windowWidth) > 50) {
    // Create a custom event
    let event = new CustomEvent('resize-side', { detail: window.innerWidth });

    // Dispatch the event
    window.dispatchEvent(event);
  }

  // Update the stored window width
  windowWidth = window.innerWidth;
}

// Add the event listener
// window.addEventListener('resize', );

window.onresize = function () {
  handleResize()
};

// Add a listener for the custom resize event
window.addEventListener('resize-side', function (e) {
  resetCalculations()
  loadItems()
});

function loadItems() {

  // Check the screen width and execute the appropriate function
  //creating a card for each item on the items list
  if (window.innerWidth < 1366) {
    container.classList.add("hide-container")
    containerSm.classList.remove("hide-container")
    for (let index = 0; index < itemsList.length; index++) {
      const item = itemsList[index];
      containerSm.innerHTML += ` <div
  class="cols col-12 col-sm-6 mb-2">

  <div class="card mb-0" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-5">
        <!-- picture -->
        <img src="${item.img}" class="card-img-top" alt="${item.name}">
      </div>
      <div class="col-7">
        <div class="card-body">
          <!-- textutal details -->
          <h5 class="card-title text-center">${item.name}</h5>
          <p class="card-text text-center text-success fw-bold">${toUSDFormat(item.price)} c/u</p>

          <!-- card actions -->
          <div class="input-group mb-2">
            <a class="btn btn-danger fw-bold" id="btn-minus-${index}" href="#" role="button"
              onclick="deleteProduct(event,'inputSm-${index}', ${item.price}, ${item.id})">-</a>
            <input readonly type="number" id="inputSm-${index}" value="0" min="0" pattern="^[0-9]*$"
              class="form-control fw-bold fs-4 text-center" aria-describedby="basic-addon1">
            <a class="btn btn-primary fw-bold" id="btn-plus-${index}" href="#" role="button"
              onclick="addProduct(event,'inputSm-${index}', ${item.price},${item.id})">+</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>`;
    }

  } else {

    containerSm.classList.add("hide-container")
    container.classList.remove("hide-container")

    for (let index = 0; index < itemsList.length; index++) {
      const item = itemsList[index];
      container.innerHTML += ` <div
    class=" mb-2">

    <div class="card" style="max-width: 195px !important;">

      <!-- picture -->
      <img src="${item.img}" class="card-img-top mb-0 pb-0" alt="${item.name}">

      <div class="card-body mt-0 pt-0 pb-1 px-1">
        <!-- textutal details -->
        <p class="fw-semibold fs-5 text-center mb-0 mt-0">${item.name}</p>
        <p class="card-text text-center text-success fw-bold mb-0">${toUSDFormat(item.price)} c/u</p>

        <!-- card actions -->
        <div class="input-group mb-0 mt-0">
          <a class="btn btn-danger fw-bold" id="btn-minus-${index}" href="#" role="button"
            onclick="deleteProduct(event,'input-${index}', ${item.price} ,${item.id})">-</a>
          <input readonly type="number" id="input-${index}" value="0" min="0" pattern="^[0-9]*$"
            class="form-control fw-bold fs-4 text-center" aria-describedby="basic-addon1">
          <a class="btn btn-primary fw-bold" id="btn-plus-${index}" href="#" role="button"
            onclick="addProduct(event,'input-${index}', ${item.price}, ${item.id})">+</a>
        </div>
      </div>
    </div>
    </div>`;
    }
  }
}

//logic

// Create WebSocket connection.
const socketItemSelector = new WebSocket('ws://localhost:8080');

function addProduct(event, idInput, selectedItemPrice, selectedItemId) {
  event.preventDefault();
  let input = document.getElementById(idInput);
  input.value++;
  total += parseFloat(selectedItemPrice)
  labelTotal.innerText = `${toUSDFormat(total.toFixed(2))} ${currencyType(total.toFixed(2))}`

  // Send the ID of the added item to the server
  addOrRemoveItemToList(selectedItemId);

  updateChange()
}

function deleteProduct(event, idInput, selectedItemPrice, selectedItemId) {
  event.preventDefault();

  let input = document.getElementById(idInput);

  if (input.value > 0) {
    input.value--;
    total -= parseFloat(selectedItemPrice)
    labelTotal.innerText = `${toUSDFormat(total.toFixed(2))} ${currencyType(total.toFixed(2))}`

    // Send the ID of the removed item to the server, prefixed with a minus sign
    let itemId = '-' + selectedItemId;
    // socketItemSelector.send(itemId);
    addOrRemoveItemToList(itemId);

    updateChange()
  }
}

function addOrRemoveItemToList(itemId) {

  if (itemId && itemId.toString().startsWith('-')) {
    // Remove item from table
    let itemToRemove = itemId.substring(1);

    if (itemToRemove) {
      for (let index = 0; index < selectedItemsIds.length; index++) {
        const item = selectedItemsIds[index];

        if (item == itemToRemove) {
          selectedItemsIds.splice(index, 1)

          /*without this, the loop removes all items from
           the array that make true the condition all at 
           once!*/
          break;
        }
      }

      generateObjectsOfSelectedItems();
    }

  } else {
    selectedItemsIds.push(itemId)

    generateObjectsOfSelectedItems()
    // Add item to table
  }
}

function generateObjectsOfSelectedItems() {
  //reseting state
  selectedArticlesWithAmount = []

  /*first, we count how many id's of each selected item
   there is on the selectedItems array*/
  const idCounts = selectedItemsIds.reduce((counts, id) => {
    counts[id] = (counts[id] || 0) + 1;
    return counts;
  }, {});


  // Create new array of objects given the id´s of the items

  /* with the filter, we just leave the items which id's were 
  present on "selectedItemsIds" array */
  selectedArticlesWithAmount = itemsList.filter(obj => idCounts.hasOwnProperty(obj.id)).map(obj => {

    //adding how many times the article it's been selected
    const count = idCounts[obj.id];
    return {
      ...obj,
      count
    };

  });

  //sending the items object list to the table page
  socketItemSelector.send(JSON.stringify(selectedArticlesWithAmount));

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

  selectedArticlesWithAmount = []
  socketItemSelector.send(JSON.stringify(selectedArticlesWithAmount));

  location.reload()
}

function openSummaryOnTable() {
  window.open('selectedItems.html', '_blank', 'width=1024,height=768');

  // The new window has opened
  setTimeout(() => {
    socketItemSelector.send(JSON.stringify(selectedArticlesWithAmount));
  }, 500)

}

function updateChange() {
  totalCountOfTickets();
  showInSimpleList()

  if (moneyGiven != null && moneyGiven > -1 && !isNaN(parseFloat(moneyGiven))) {
    let changeToGive = parseFloat(moneyGiven) - parseFloat(total)

    //Alert
    if (moneyGiven == 0) {
      lblChange.innerHTML = `
      <div class="card border-warning mb-1 mt-3">
        <div class="card-header"><span class="fw-bold">¡Alerta!</span></div>
        <div class="card-body">
          <p class="card-text">Debe ingresar la cantidad de dinero otorgada por el cliente para poder calcular el
            vuelto.
          </p>
        </div>
      </div>
      `
      return
    }

    //Alert
    if (changeToGive.toFixed(2) < 0) {
      lblChange.innerHTML = ` <div class="card text-bg-danger mb-1 mt-3">
        <div class="card-header"><span class="fw-bold">¡Alerta!</span></div>
        <div class="card-body">
          <h5 class="card-title">Dinero insuficiente</h5>
          <p class="card-text">El monto otorgado por el cliente es menor a monto total debitado. <span
              class="fw-bold">(${toUSDFormat(total.toFixed(2))} dólares)</span></p>
          <hr>
          <p class="card-text"><span class="fw-bold"> Dinero faltante: ${toUSDFormat(total.toFixed(2) - moneyGiven)}
              ${currencyType(total.toFixed(2) - moneyGiven)}</span></p>
        </div>
        </div>
        `
      return
    }

    //Change if every condition is met
    lblChange.innerHTML = `<p class="fw-bold mt-0 fs-1 text-danger">${toUSDFormat(changeToGive.toFixed(2))}
          ${currencyType(changeToGive.toFixed(2))}</p>`
  }
}

//events
amountOfMoneyGiven.addEventListener('input', (event) => {
  moneyGiven = event.target.value;
  updateChange()
});