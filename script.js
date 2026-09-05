/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
});


/* Close mobile menu after clicking a link */

document.querySelectorAll("#navMenu a").forEach(function (link) {

    link.addEventListener("click", function () {
        navMenu.classList.remove("show");
    });

});


/* =========================
   MENU CATEGORIES
========================= */

function showCategory(categoryId, button) {

    document.querySelectorAll(".food-category").forEach(function (category) {
        category.classList.remove("active-category");
    });

    document.getElementById(categoryId).classList.add("active-category");


    document.querySelectorAll(".category").forEach(function (btn) {
        btn.classList.remove("active");
    });

    button.classList.add("active");

}


/* =========================
   CART
========================= */

let cart = [];


/* Add item */

function addToCart(name, price) {

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* Update cart */

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "0";

        return;
    }


    let total = 0;
    let count = 0;


    cart.forEach(function (item, index) {

        total += item.price * item.quantity;
        count += item.quantity;


        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-info">

                <strong>${item.name}</strong>

                <small>
                    ₹${item.price} × ${item.quantity}
                </small>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

            <div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

                <br>

                <button
                    class="remove-item"
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent = count;
    cartTotal.textContent = total;

}


/* Increase */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


/* Decrease */

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* Remove */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* Open cart */

function openCart() {

    document.getElementById("cartPanel").classList.add("show");

    document.getElementById("cartOverlay").classList.add("show");

}


/* Close cart */

function closeCart() {

    document.getElementById("cartPanel").classList.remove("show");

    document.getElementById("cartOverlay").classList.remove("show");

}


/* =========================
   WHATSAPP ORDER
========================= */

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add some food first.");

        return;
    }


    let message = "Hello Spice Garden Restaurant!%0A%0A";
    message += "I would like to order:%0A%0A";


    let total = 0;


    cart.forEach(function (item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        message +=
            "🍽️ " +
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";

    });


    message += "%0A💰 Total: ₹" + total;

    message += "%0A%0APlease confirm my order.";


    const phoneNumber = "910000000000";

    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(whatsappURL, "_blank");

}


/* =========================
   BOOKING
========================= */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name =
        document.getElementById("bookingName").value;

    const phone =
        document.getElementById("bookingPhone").value;

    const date =
        document.getElementById("bookingDate").value;

    const time =
        document.getElementById("bookingTime").value;

    const members =
        document.getElementById("bookingMembers").value;

    const request =
        document.getElementById("bookingRequest").value;


    let message =
        "Hello Spice Garden Restaurant!%0A%0A";

    message += "📅 TABLE BOOKING REQUEST%0A%0A";

    message += "Name: " + encodeURIComponent(name) + "%0A";

    message += "Phone: " + encodeURIComponent(phone) + "%0A";

    message += "Date: " + encodeURIComponent(date) + "%0A";

    message += "Time: " + encodeURIComponent(time) + "%0A";

    message += "Members: " + encodeURIComponent(members) + "%0A";


    if (request.trim() !== "") {

        message +=
            "Special Request: " +
            encodeURIComponent(request) +
            "%0A";

    }


    message += "%0APlease confirm my table booking.";


    const phoneNumber = "910000000000";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(whatsappURL, "_blank");

});


/* =========================
   DATE
========================= */

const bookingDate =
    document.getElementById("bookingDate");


const today =
    new Date().toISOString().split("T")[0];


bookingDate.min = today;
