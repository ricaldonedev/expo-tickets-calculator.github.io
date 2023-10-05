const array = [
  { name: "Pizza", price: 2, img: "media/pizza.png" },
  { name: "Soda", price: 0.75, img: "media/sodas.png" },
  { name: "Hot dog", price: 1.5, img: "media/hotdog.png" },
  { name: "Frozen", price: 1.5, img: "media/frozen.png" },
  { name: "Agua", price: 0.5, img: "media/agua.png" },
  { name: "Jugos", price: 0.6, img: "media/jugos.png" },
];

let container = document.getElementById("ticketCardsContainer");

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  container.innerHTML += `<div class="cols col-12 col-sm-6 col-lg-4 mb-3 ticket-card">
    <div class="card">

      <!-- picture -->
      <img src="${element.img}" class="card-img-top" alt="${element.name}">

      <div class="card-body">
        <!-- textutal details -->
        <h5 class="card-title text-center">${element.name}</h5>
        <p class="card-text text-center">$${element.price}</p>

        <!-- card actions -->
        <div class="input-group mb-3">
          <a class="btn btn-primary" id="btn-minus-${index}" href="#" role="button" onclick="deleteProduct(event,'input-${index}')">-</a>
          <input type="number" id="input-${index}" value="0" min="0" pattern="^[0-9]*$" class="form-control" aria-label="Username"
            aria-describedby="basic-addon1">
          <a class="btn btn-primary" id="btn-plus-${index}" href="#" role="button" onclick="addProduct(event,'input-${index}')">+</a>
        </div>
      </div>
    </div>
  </div>`;
}

function addProduct(event, idInput) {
  event.preventDefault();
  let input = document.getElementById(idInput);
  input.value++;
}

function deleteProduct(event, idInput) {
  event.preventDefault();
  let input = document.getElementById(idInput);
  if (input.value > 0) {
    input.value--;
  }
}
