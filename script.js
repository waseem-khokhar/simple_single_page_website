// Product data
var products = [
  { id: 1, name: "White Bread", price: 150 },
  { id: 2, name: "Brown Bread", price: 180 },
  { id: 3, name: "Chocolate Cake", price: 1200 },
  { id: 4, name: "Cookies (box)", price: 400 }
];

// ---------- Home page: products and order ----------
var productBox = document.getElementById("products");

if (productBox) {
  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  for (var i = 0; i < products.length; i++) {
    var p = products[i];
    var div = document.createElement("div");
    div.className = "product";
    div.innerHTML = "<h3>" + p.name + "</h3><p>Rs " + p.price + "</p>" +
      "<button data-id='" + p.id + "'>Add to Order</button>";
    productBox.appendChild(div);
  }

  productBox.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      var id = Number(e.target.getAttribute("data-id"));
      for (var j = 0; j < products.length; j++) {
        if (products[j].id === id) cart.push(products[j]);
      }
      saveCart();
    }
  });

  document.getElementById("clear-cart").addEventListener("click", function () {
    cart = [];
    saveCart();
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }

  function showCart() {
    var list = document.getElementById("cart-list");
    var total = 0;
    list.innerHTML = "";
    if (cart.length === 0) list.innerHTML = "<li>No items yet.</li>";
    for (var k = 0; k < cart.length; k++) {
      var li = document.createElement("li");
      li.textContent = cart[k].name + " - Rs " + cart[k].price;
      list.appendChild(li);
      total += cart[k].price;
    }
    document.getElementById("cart-total").textContent = "Rs " + total;
  }

  showCart();
}

// ---------- Contact page: form ----------
var form = document.getElementById("contact-form");

if (form) {
  var messages = JSON.parse(localStorage.getItem("messages")) || [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();
    var error = document.getElementById("form-error");

    if (name === "" || email === "" || message === "") {
      error.textContent = "Please fill in all fields.";
      return;
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      error.textContent = "Please enter a valid email.";
      return;
    }

    error.textContent = "";
    messages.push({ name: name, email: email, message: message });
    localStorage.setItem("messages", JSON.stringify(messages));
    form.reset();
    alert("Thank you, " + name + "! Your message was saved.");
    showMessages();
  });

  function showMessages() {
    var list = document.getElementById("message-list");
    list.innerHTML = "";
    if (messages.length === 0) list.innerHTML = "<li>No messages yet.</li>";
    for (var i = 0; i < messages.length; i++) {
      var li = document.createElement("li");
      li.textContent = messages[i].name + " (" + messages[i].email + "): " + messages[i].message;
      list.appendChild(li);
    }
  }

  showMessages();
}
