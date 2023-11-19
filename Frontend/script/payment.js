document.addEventListener("DOMContentLoaded", function() {
    const paymentOptions = document.querySelectorAll(".payment-option");
    const paymentResult = document.getElementById("payment-result");

    // Event listener for payment option buttons
    paymentOptions.forEach(option => {
        option.querySelector(".btn-pay").addEventListener("click", function() {
            const paymentMethod = option.querySelector("h2").textContent;
            paymentResult.textContent = `Processing payment with ${paymentMethod}...`;

            // Simulate payment processing (Replace this with actual payment processing logic)
            setTimeout(function() {
                paymentResult.textContent = `Payment with ${paymentMethod} was successful!`;
                // You can now proceed with the next steps
                // For example, displaying an order confirmation, updating the database, etc.
                // You may need server-side code for these actions.
            }, 2000);
        });
    });
});
