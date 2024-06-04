  document.addEventListener('DOMContentLoaded', function() {
    function updateWishlist(productId, action) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (action === 'add') {
        if (!wishlist.includes(productId)) {
          wishlist.push(productId);
        }
      } else if (action === 'remove') {
        wishlist = wishlist.filter(id => id !== productId);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    document.querySelectorAll('.wishlist-button').forEach(button => {
      button.addEventListener('click', function(event) {
         event.stopImmediatePropagation(); // Prevent further propagation
        const productId = this.getAttribute('data-product-id');
        updateWishlist(productId, 'add');
        alert('Added to Wishlist!');
   
      });
    });
  });

 function updateWishlist(productId, action) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

      if (action === 'remove') {
        wishlist = wishlist.filter(id => id !== productId);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
 };

    document.body.addEventListener('click', function(event) {
       event.stopImmediatePropagation(); // Prevent further propagation
      if (event.target.classList.contains('remove-wishlist-button')) { 
         const productId = event.target.getAttribute('data-product-id');
        updateWishlist(productId, 'remove');
        alert('Removed from Wishlist!');
      }
    });