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

    document.querySelectorAll(".category").forEach(function (btn) {
        btn.classList.remove("active");
    });

    document.getElementById(categoryId).classList.add("active-category");

    button.classList.add("active");
}


/* =========================
   CART
========================= */

let cart = [];


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


function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}


function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartCount.textContent = "0";
        cartTotal.textContent = "0";

        return;
    }


    let total = 0;
    let itemCount = 0;

    cartItems.innerHTML = "";


    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        itemCount += item.quantity;

        const itemElement = document.createElement("div");

        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <small>₹${item.price} each</small>

                <div class="quantity-controls">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
            </div>

            <div>
                <strong>₹${itemTotal}</strong>
                <br>
                <button class="remove-item" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(itemElement);
    });


    cartCount.textContent = itemCount;
    cartTotal.textContent = total;
}


/* =========================
   OPEN / CLOSE CART
========================= */

function openCart() {

    document.getElementById("cartPanel").classList.add("show");
    document.getElementById("cartOverlay").classList.add("show");
}


function closeCart() {

    document.getElementById("cartPanel").classList.remove("show");
    document.getElementById("cartOverlay").classList.remove("show");
}


/* =========================
   WHATSAPP ORDER
========================= */

function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty. Please add some items first.");
        return;
    }


    let message = "Hello Spice Garden Restaurant!%0A%0A";
    message += "*New Food Order*%0A%0A";

    let total = 0;

    cart.forEach(function (item) {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        message +=
            "• " +
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";
    });


    message += "%0A*Total: ₹" + total + "*";
    message += "%0A%0APlease confirm my order.";


    /*
       IMPORTANT:
       Replace 910000000000 below with the
       restaurant's real WhatsApp number.
    */

    const whatsappNumber = "910000000000";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;

    window.open(whatsappURL, "_blank");
}


/* =========================
   TABLE BOOKING
========================= */

const bookingForm = document.getElementById("bookingForm");


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


    let message =
        "Hello Spice Garden Restaurant!%0A%0A";

    message += "*Table Booking Request*%0A%0A";

    message += "Name: " + encodeURIComponent(name) + "%0A";
    message += "Phone: " + encodeURIComponent(phone) + "%0A";
    message += "Date: " + encodeURIComponent(date) + "%0A";
    message += "Time: " + encodeURIComponent(time) + "%0A";
    message += "Members: " + encodeURIComponent(members);


    /*
       Replace this number with the restaurant's
       real WhatsApp number.
    */

    const whatsappNumber = "910000000000";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(whatsappURL, "_blank");

});


/* =========================
   SET MINIMUM BOOKING DATE
========================= */

const bookingDate =
    document.getElementById("bookingDate");

const today =
    new Date().toISOString().split("T")[0];

bookingDate.min = today;


/* =========================
   INITIAL CART
========================= */

updateCart();
