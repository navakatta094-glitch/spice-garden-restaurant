/* =================================
   SPICE GARDEN RESTAURANT
   JAVASCRIPT
================================= */

let cart = [];


/* =================================
   PAGE LOAD
================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE MENU */

    const menuButton = document.getElementById("menuToggle");
    const navigation = document.getElementById("navMenu");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("show");
        });

    }


    /* CLOSE MOBILE MENU AFTER CLICK */

    document.querySelectorAll("#navMenu a").forEach(function (link) {

        link.addEventListener("click", function () {

            if (navigation) {
                navigation.classList.remove("show");
            }

        });

    });


    /* SHOW STARTERS BY DEFAULT */

    const firstCategory = document.querySelector(".category");

    if (firstCategory) {
        showCategory("starters", firstCategory);
    }


    /* UPDATE CART */

    updateCart();


    /* =================================
       BOOKING FORM
    ================================= */

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("bookingName")?.value.trim() || "";

            const phone =
                document.getElementById("bookingPhone")?.value.trim() || "";

            const date =
                document.getElementById("bookingDate")?.value || "";

            const time =
                document.getElementById("bookingTime")?.value || "";

            const members =
                document.getElementById("bookingMembers")?.value || "";

            const request =
                document.getElementById("bookingRequest")?.value.trim() || "";


            if (!name || !phone || !date || !time || !members) {

                alert("Please fill all required booking details.");

                return;
            }


            alert(
                "Table booking request submitted successfully!\n\n" +

                "Name: " + name + "\n" +

                "Date: " + date + "\n" +

                "Time: " + time + "\n" +

                "Members: " + members +

                (request
                    ? "\nSpecial request: " + request
                    : "")
            );


            bookingForm.reset();

        });

    }


    /* =================================
       PREVENT PAST BOOKING DATES
    ================================= */

    const dateInput =
        document.getElementById("bookingDate");

    if (dateInput) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1).padStart(2, "0");

        const day =
            String(today.getDate()).padStart(2, "0");

        dateInput.min =
            year + "-" + month + "-" + day;
    }


    /* =================================
       CLOSE CART BY CLICKING OVERLAY
    ================================= */

    const overlay =
        document.getElementById("cartOverlay");

    if (overlay) {

        overlay.addEventListener("click", function () {
            closeCart();
        });

    }

});


/* =================================
   MENU CATEGORIES
================================= */

function showCategory(categoryName, button) {

    const sections =
        document.querySelectorAll(".food-category");


    sections.forEach(function (section) {

        section.classList.remove("active-category");

    });


    const selectedSection =
        document.getElementById(categoryName);


    if (selectedSection) {

        selectedSection.classList.add("active-category");

    }


    document.querySelectorAll(".category")
        .forEach(function (btn) {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }

}


/* =================================
   GO TO SECTION
================================= */

function goToSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =================================
   ADD TO CART
================================= */

function addToCart(name, price) {

    const existingItem =
        cart.find(function (item) {
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


    /* OPEN CART AFTER ADDING */

    openCart();

}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartCount =
        document.getElementById("cartCount");


    if (!cartItems || !cartTotal) {
        return;
    }


    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

        cartTotal.textContent = "0";

        if (cartCount) {
            cartCount.textContent = "0";
        }

        return;
    }


    let total = 0;
    let itemCount = 0;


    cartItems.innerHTML = "";


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;

        itemCount += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <div class="cart-item-price">
                    ₹${item.price}
                </div>

                <div class="cart-quantity">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

            </div>

            <div>

                <strong>
                    ₹${itemTotal}
                </strong>

                <br>

                <button
                    class="cart-remove"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        total.toLocaleString("en-IN");


    if (cartCount) {

        cartCount.textContent =
            itemCount;

    }

}


/* =================================
   INCREASE QUANTITY
================================= */

function increaseQuantity(index) {

    if (cart[index]) {

        cart[index].quantity++;

        updateCart();

    }

}


/* =================================
   DECREASE QUANTITY
================================= */

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


/* =================================
   REMOVE ITEM
================================= */

function removeFromCart(index) {

    if (cart[index]) {

        cart.splice(index, 1);

        updateCart();

    }

}


/* =================================
   CLEAR CART
================================= */

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmation =
        confirm("Are you sure you want to clear the cart?");


    if (confirmation) {

        cart = [];

        updateCart();

    }

}


/* =================================
   OPEN CART
================================= */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    const panel =
        document.getElementById("cartPanel");


    if (overlay) {

        overlay.classList.add("show");

    }


    if (panel) {

        panel.classList.add("show");

    }


    document.body.classList.add("cart-open");


    updateCart();

}


/* =================================
   CLOSE CART
================================= */

function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    const panel =
        document.getElementById("cartPanel");


    if (overlay) {

        overlay.classList.remove("show");

    }


    if (panel) {

        panel.classList.remove("show");

    }


    document.body.classList.remove("cart-open");

}


/* =================================
   WHATSAPP ORDER
================================= */

function orderOnWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    let message =
        "Hello Spice Garden Restaurant!%0A%0A";

    message +=
        "I would like to order:%0A";


    let total = 0;


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        message +=
            "• " +
            item.name +
            " x" +
            item.quantity +
            " - ₹" +
            itemTotal +
            "%0A";

    });


    message +=
        "%0ATotal: ₹" +
        total;


    /* REPLACE THIS NUMBER WITH THE RESTAURANT'S
       REAL WHATSAPP NUMBER */

    const phoneNumber =
        "910000000000";


    const whatsappURL =
        "https://wa.me/" +
        phoneNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =================================
   WRITE A REVIEW
================================= */

function writeReview() {

    const email =
        "restaurant@example.com";


    const subject =
        encodeURIComponent(
            "Spice Garden Restaurant Review"
        );


    const body =
        encodeURIComponent(
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
