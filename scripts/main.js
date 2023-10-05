const array = [
  { name: "Pizza", price: 2, img: "media/pizza.png" },
  { name: "Soda", price: 0.75, img: "media/frozen.png" },
  { name: "Hot dog", price: 1.5, img: "media/hotdog.png" },
  { name: "Frozen", price: 1.5, img: "media/frozen.png" },
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
        <p class="card-text text-center">${element.price}</p>

        <!-- card actions -->
        <div class="input-group mb-3">
          <a class="btn btn-primary" href="#" role="button">-</a>
          <input type="text" class="form-control" placeholder="0" aria-label="Username"
            aria-describedby="basic-addon1">
          <a class="btn btn-primary" href="#" role="button">+</a>
        </div>
      </div>
    </div>
  </div>`
}