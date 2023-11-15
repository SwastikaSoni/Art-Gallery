document.addEventListener("DOMContentLoaded", function() {
    const cartItems = [];
    const cartItemCount = document.getElementById("cart-item-count");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartItemsContainer = document.querySelector(".cart-items");
  
    function updateCartDisplay() {
      cartItemCount.textContent = cartItems.length;
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
      cartTotalPrice.textContent = totalPrice;
      cartItemsContainer.innerHTML = "";
  
      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
          <img src="images/empty-cart.png" alt="Empty Cart">
          <p>Your cart is empty.</p>
        `;
      } else {
        cartItems.forEach((item, index) => {
          const cartItemElement = document.createElement("div");
          cartItemElement.className = "cart-item";
  
          cartItemElement.innerHTML = `
          <div class="item-image">
            <img class="item-img" src="${item.image}" alt="${item.paintingName}">
          </div>
            <div class="item-details">
              <h2>${item.paintingName}</h2>
              <p>By ${item.artistName}</p>
              <p>Price: ₹${item.price}</p>
              <p>Rating: ${item.rating}</p>
            </div>
            <button class="remove-button" data-index="${index}">Remove</button>
          `;
  
          cartItemsContainer.appendChild(cartItemElement);
        });
      }
  
      // Add click event listeners to remove buttons
      const removeButtons = document.querySelectorAll(".remove-button");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          cartItems.splice(index, 1);
          updateCartDisplay();
        });
      });
    }
  
    // Sample code to add items to the cart (you can replace this with your logic)
    function addItemToCart(item) {
      cartItems.push(item);
      updateCartDisplay();
    }
  
    // Sample usage of adding an item to the cart
    addItemToCart({
      paintingName: "Sample Painting",
      artistName: "Sample Artist",
      price: 100,
      rating: 4.5,
      image: "images/madhubani.jpg"
    });
    addItemToCart({
        paintingName: "Sample Painting",
        artistName: "Sample Artist",
        price: 100,
        rating: 4.5,
        image: "images/madhubani.jpg"
      });
    // You can add more items to the cart using addItemToCart function
  });
  