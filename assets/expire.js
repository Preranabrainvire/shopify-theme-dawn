document.addEventListener('DOMContentLoaded', function() {
  // Function to start the countdown
  function startCountdown(lineItemId) {
    var countdownDuration = 2 * 60 * 1000; // 5 minutes in milliseconds
    var expirationTime = new Date().getTime() + countdownDuration;

    // Check the timer every second
    var countdownInterval = setInterval(function() {
      var now = new Date().getTime();
      var distance = expirationTime - now;

      // If the timer reaches zero, remove the product from the cart
      if (distance <= 0) {
        clearInterval(countdownInterval);
        removeFromCart(lineItemId);
      }
    }, 1000);
  }

  // Function to remove a product from the cart using the line item ID
  function removeFromCart(lineItemId) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: lineItemId,
        quantity: 0
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product removed from cart:', data);
      // Optionally, you can refresh the cart display here
      location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  // Function to handle adding a product to the cart
  function handleAddToCart(event) {
    // Add an event listener for the add-to-cart button
    document.querySelectorAll('form[action="/cart/add"]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var formData = new FormData(form);

        fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          console.log('Product added to cart:', data);
          startCountdown(data.id); // Start the countdown for the added product
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });
    });
  }

  handleAddToCart(); // Initialize the add-to-cart handler
});
