let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Aloo Sabzi",
    image: "aloo sabzi.jpg",
    price: 30.0,
    reviews: [],
  },
  {
    id: 2,
    name: "Burger",
    image: "burger.jpg",
    price: 70,
    reviews: [],
  },
  {
    id: 3,
    name: "Chocolate Pastry",
    image: "chocolate pastry.jpg",
    price: 75,
    reviews: [],
  },
  {
    id: 4,
    name: "Chole Bhature",
    image: "chole bhature.jpg",
    price: 110,
    reviews: [],
  },
  {
    id: 5,
    name: "Daal Tadka",
    image: "daal tadka.jpg",
    price: 140,
    reviews: [],
  },
  {
    id: 6,
    name: "Masala Dosa",
    image: "dosa.jpg",
    price: 120,
    reviews: [],
  },
  {
    id: 7,
    name: "French Fries",
    image: "french fries.jpg",
    price: 80,
    reviews: [],
  },
  {
    id: 8,
    name: "Idli",
    image: "idli.jpg",
    price: 70,
    reviews: [],
  },
  {
    id: 9,
    name: "Kheer",
    image: "kheer.jpg",
    price: 65,
    reviews: [],
  },
  {
    id: 10,
    name: "Full-Pack Lunch",
    image: "lunch.jpg",
    price: 140,
    reviews: [],
  },
  {
    id: 11,
    name: "Noodle",
    image: "noodle.jpg",
    price: 99,
    reviews: [],
  },
  {
    id: 12,
    name: "Palak Paneer",
    image: "palak panner.jpg",
    price: 190,
    reviews: [],
  },
  {
    id: 13,
    name: "Pasta",
    image: "pasta.jpg",
    price: 100,
    reviews: [],
  },
  {
    id: 14,
    name: "Pizza",
    image: "pizza.jpg",
    price: 169,
    reviews: [],
  },
  {
    id: 15,
    name: "Raita",
    image: "raita.jpg",
    price: 90,
    reviews: [],
  },
  {
    id: 16,
    name: "Rice",
    image: "rice.jpg",
    price: 60,
    reviews: [],
  },
  {
    id: 17,
    name: "Salad",
    image: "salad.jpg",
    price: 55,
    reviews: [],
  },
  {
    id: 18,
    name: "Uttapam",
    image: "utapa.jpg",
    price: 125,
    reviews: [],
  },
  {
    id: 19,
    name: "Vada Pav",
    image: "vada pav.jpg",
    price: 20,
    reviews: [],
  },
  {
    id: 20,
    name: "Veg Biryani",
    image: "veg biryaani.jpg",
    price: 180,
    reviews: [],
  },
  {
    id: 21,
    name: "Pani Puri",
    image: "pani_puri.jpg",
    price: 100,
    reviews: [],
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">₹${value.price.toLocaleString()}/-</div>
            <div class="rating" data-key="${key}">
        <span onclick="rateItem(${key}, 1)" class="star">★</span>
        <span onclick="rateItem(${key}, 2)" class="star">★</span>
        <span onclick="rateItem(${key}, 3)" class="star">★</span>
        <span onclick="rateItem(${key}, 4)" class="star">★</span>
        <span onclick="rateItem(${key}, 5)" class="star">★</span>
      </div>
            <button onclick="addToCard(${key})">Add To Cart </button>`;
    list.appendChild(newDiv);
    const stars = newDiv.querySelectorAll(`.rating[data-key="${key}"] .star`);
    stars.forEach((star, index) => {
      star.classList.toggle("selected", index < 4);
    });
  });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    // copy product form list to list card
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>₹${value.price.toLocaleString()}/-</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCard();
}
function rateItem(key, rating) {
  var existingReviewBox = document.querySelector(".review-box");
  if (existingReviewBox) {
    existingReviewBox.remove();
  }
  const stars = document.querySelectorAll(`.rating[data-key="${key}"] .star`);
  stars.forEach((star, index) => {
    star.classList.toggle("selected", index < rating);
  });

  let reviewBox = document.createElement("div");
  reviewBox.classList.add("review-box");
  const selectedProduct = products[key];
  reviewBox.innerHTML = `
  <h3>Give your review for<h2 style="color:green"> ${
    selectedProduct.name
  }</h2></h3>
          <p>Product Price:<h2 style="color:green"> ₹${selectedProduct.price.toLocaleString()}/-</h2></p>
          <p>Your Rating:<h2 style="color:green"> ${rating} stars</h2></p>
          <input type="name" placeholder="Enter your name" name="usrname" required class="box" />
          <textarea id="reviewInput" placeholder="Write your review" name="text" required ></textarea>
          <button onclick="submitReview(${key})">Submit</button>
        `;

  reviewBox.style.width = "30rem";
  reviewBox.style.boxShadow = "var(--box-shadow)";
  reviewBox.style.padding = "2rem";
  reviewBox.style.borderRadius = "0.5rem";
  reviewBox.style.background = "#fff";
  reviewBox.style.textAlign = "center";
  reviewBox.style.position = "fixed";
  reviewBox.style.top = "50%";
  reviewBox.style.left = "50%";
  reviewBox.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(reviewBox);

  reviewBox.querySelector(".box").style.width = "100%";
  reviewBox.querySelector(".box").style.margin = "0.7rem 0";
  reviewBox.querySelector(".box").style.background = "#eee";
  reviewBox.querySelector(".box").style.borderRadius = "0.5rem";
  reviewBox.querySelector(".box").style.padding = "1rem";
  reviewBox.querySelector(".box").style.fontSize = "1.6rem";
  reviewBox.querySelector(".box").style.color = "var(--black)";
  reviewBox.querySelector(".box").style.textTransform = "none";

  reviewBox.querySelector("textarea").style.width = "100%";
  reviewBox.querySelector("textarea").style.margin = "0.7rem 0";
  reviewBox.querySelector("textarea").style.background = "#eee";
  reviewBox.querySelector("textarea").style.borderRadius = "0.5rem";
  reviewBox.querySelector("textarea").style.padding = "1rem";
  reviewBox.querySelector("textarea").style.fontSize = "1.6rem";
  reviewBox.querySelector("textarea").style.color = "var(--black)";
  reviewBox.querySelector("textarea").style.textTransform = "none";

  let submitButton = reviewBox.querySelector("button");
  submitButton.style.background = "#4CAF50";
  submitButton.style.color = "#fff";
  submitButton.style.fontSize = "1.6rem";
  submitButton.style.border = "2px solid #000";
  submitButton.style.borderRadius = "5px";
  submitButton.style.cursor = "pointer";
  submitButton.style.display = "block";
  submitButton.style.margin = "auto";
}
function submitReview(key) {
  var reviewText = document.getElementById("reviewInput").value;
  console.log("Review submitted:", reviewText);

  // Close the review box
  document.querySelector(".review-box").style.display = "none";

  // Show alert for 5 seconds
  var alertMessage = "Thank you for your ratings and review!";
  alert(alertMessage);
  setTimeout(function () {
    alertMessage.close();
  }, 5000);
}
