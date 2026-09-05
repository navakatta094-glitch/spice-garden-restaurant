// =========================
// SPICE GARDEN RESTAURANT
// COMPLETE JAVASCRIPT
// =========================

let cart = [];

// =========================
// THREE-BAR MENU
// =========================

function toggleMenu() {
    const navigation = document.getElementById("navMenu");

    if (navigation) {
        navigation.classList.toggle("show");
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("navMenu");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });
    }

    // Close menu when clicking navigation links
    const links = document.querySelectorAll("#navMenu a");

    links.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navigation) {
                navigation.classList.remove("show");
            }
        });
    });

    updateCart();

    // =========================
    // BOOKING FORM
    // =========================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("bookingName")?.value || "";
            const phone = document.getElementById("bookingPhone")?.value || "";
            const date = document.getElementById("bookingDate")?.value || "";
            const time = document.getElementById("bookingTime")?.value || "";
            const members = document.getElementById("bookingMembers")?.value || "";

            if (!name || !phone || !date || !time || !members) {
                alert("Please fill all required booking details.");
                return;
            }

            alert(
                "Table booking request submitted successfully!\n\n" +
                "Name: " + name + "\n" +
                "Date: " + date + "\n" +
                "Time: " + time + "\n" +
                "Members: " + members
            );

            bookingForm.reset();
        });
    }

});

// =========================
// MENU CATEGORIES
// =========================

function showCategory(categoryName, button) {

    const categories = [
        "starters",
        "maincourse",
        "mocktails",
        "veg",
        "nonveg"
    ];

    categories.forEach(function (category) {

        const section = document.getElementById(category);

        if (section) {
            section.style.display = "none";
        }

    });

    const selectedSection = document.getElementById(categoryName);

    if (selectedSection) {
        selectedSection.style.display = "grid";
    }

    const buttons = document.querySelectorAll(".category");

    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }
}

// =========================
// ADD TO CART
// =========================

function addToCart(name, price, image) {

    price = Number(price);

    const existingItem = cart.find(function (item) {
        return item.name === name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image || "",
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

// =========================
// UPDATE CART
// =========================

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(function (item) {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

    if (cartTotal) {
        cartTotal.textContent = "₹" + totalPrice;
    }

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(function (item, index) {

        const itemTotal = item.price * item.quantity;

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div class="cart-controls">
                <button onclick="decreaseQuantity(${index})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
                <button onclick="removeFromCart(${index})">✕</button>
            </div>

            <strong>₹${itemTotal}</strong>
        `;

        cartItems.appendChild(cartItem);
    });
}

// =========================
// INCREASE QUANTITY
// =========================

function increaseQuantity(index) {

    if (cart[index]) {
        cart[index].quantity++;
        updateCart();
    }
}

// =========================
// DECREASE QUANTITY
// =========================

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(index) {

    if (cart[index]) {

        const itemName = cart[index].name;

        cart.splice(index, 1);

        updateCart();

        alert(itemName + " removed from cart.");
    }
}

// =========================
// OPEN CART
// =========================

function openCart() {

    const overlay = document.getElementById("cartOverlay");
    const panel = document.getElementById("cartPanel");

    if (overlay) {
        overlay.classList.add("show");
    }

    if (panel) {
        panel.classList.add("show");
    }

    updateCart();
}

// =========================
// CLOSE CART
// =========================

function closeCart() {

    const overlay = document.getElementById("cartOverlay");
    const panel = document.getElementById("cartPanel");

    if (overlay) {
        overlay.classList.remove("show");
    }

    if (panel) {
        panel.classList.remove("show");
    }
}

// =========================
// CLEAR CART
// =========================

function clearCart() {

    if (cart.length === 0) {
        alert("Your cart is already empty.");
        return;
    }

    cart = [];

    updateCart();

    alert("Cart cleared.");
}

// =========================
// WHATSAPP ORDER
// =========================

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Please add some items to your cart first.");

        return;
    }

    let message = "Hello Spice Garden Restaurant!%0A%0A";
    message += "I would like to order:%0A%0A";

    let total = 0;

    cart.forEach(function (item) {

        const itemTotal = item.price * item.quantity;

        message +=
            item.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";

        total += itemTotal;
    });

    message += "%0ATotal: ₹" + total;

    // Replace this number with the restaurant's real WhatsApp number.
    const restaurantNumber = "910000000000";

    const whatsappURL =
        "https://wa.me/" +
        restaurantNumber +
        "?text=" +
        message;

    window.open(whatsappURL, "_blank");
}

// =========================
// REVIEW BUTTON
// =========================

function writeReview() {

    const email = "restaurant@example.com";

    const subject = encodeURIComponent(
        "Spice Garden Restaurant Review"
    );

    const body = encodeURIComponent(
        "Hello Spice Garden Restaurant,\n\n" +
        "My review:\n\n"
    );

    window.location.href =
        "mailto:" +
        email +
        "?subject=" +
        subject +
        "&body=" +
        body;
}

// =========================
// SMOOTH SCROLL
// =========================

function goToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });
    }

    const navigation = document.getElementById("navMenu");

    if (navigation) {
        navigation.classList.remove("show");
    }
}

// =========================
// CLOSE CART WHEN CLICKING
// OUTSIDE THE CART
// =========================

document.addEventListener("click", function (event) {

    const overlay = document.getElementById("cartOverlay");
    const panel = document.getElementById("cartPanel");

    if (
        overlay &&
        panel &&
        event.target === overlay
    ) {
        closeCart();
    }

});

// =========================
// SET MINIMUM BOOKING DATE
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const dateInput = document.getElementById("bookingDate");

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        dateInput.min =
            year + "-" +
            month + "-" +
            day;
    }

});
