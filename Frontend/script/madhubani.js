document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    // Fetch Madhubani paintings from your server
    fetch('http://localhost:3000/madhubanis') 
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Call the function to display artworks with the retrieved data
            displayArtworks(data);
        })
        .catch(error => console.error('Error fetching madhubani data:', error));

    // Sort and display the artwork cards based on the selected filters
    // priceFilter.addEventListener("change", updateGallery);
    // ratingFilter.addEventListener("change", updateGallery);

    // function updateGallery(artworks) {
    //     const priceSort = priceFilter.value === "highToLow" ? -1 : 1;
    //     const ratingSort = ratingFilter.value === "highToLow" ? -1 : 1;

    //     const sortedArtworks = artworks.sort((a, b) => {
    //         return a.price * priceSort - b.price * priceSort || a.rating * ratingSort - b.rating * ratingSort;
    //     });

    //     displayArtworks(sortedArtworks);
    // }
    
    
    function displayArtworks(artworks) {
        gallery.innerHTML = "";

        artworks.forEach((artwork, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = "Frontend\images\placeholder.jpg"; // Placeholder image
            if (artwork.imageData) {
                image.src = `data:image/jpeg;base64,${artwork.imageData}`;
            }
    
            image.dataset.src = image.src;
            card.appendChild(image);

            // Load images lazily when they come into the viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(image);

            const title = document.createElement("div");
            title.innerText = artwork.paintingName;
            card.appendChild(title);

            const artist = document.createElement("div");
            artist.innerText = artwork.artist;
            card.appendChild(artist);

            const price = document.createElement("div");
            price.innerText = `Price: ₹${artwork.price}`;
            card.appendChild(price);

            const ratingContainer = document.createElement("div");
            const ratingLabel = document.createElement("span");
            ratingLabel.innerText = "Rating: ";
            ratingContainer.appendChild(ratingLabel);
    
            const originalRating = document.createElement("span");
            originalRating.innerText = artwork.rating.toFixed(2); // Display the original rating from MongoDB
            ratingContainer.appendChild(originalRating);
    
            const ratingDropdown = document.createElement("select");
            const ratings = [1, 2, 3, 4, 5];
            ratings.forEach((rating) => {
                const option = document.createElement("option");
                option.value = rating;
                option.innerText = rating;
                ratingDropdown.appendChild(option);
            });
            const spacingClass = "rating-spacing";
    
            // Add an event listener to update the displayed rating when the user selects a new rating
            ratingDropdown.addEventListener("change", function () {
                const selectedRating = parseFloat(ratingDropdown.value);
                const previousTotalArtworks = artwork.totalVotes; // Get the previous total number of artworks
            
                // Calculate the new rating
                const newRating = ((artwork.rating * previousTotalArtworks) + selectedRating) / (previousTotalArtworks + 1);
            
                // Update the displayed rating
                originalRating.innerText = newRating.toFixed(2);
            });
            ratingDropdown.classList.add(spacingClass);
    
            ratingContainer.appendChild(ratingDropdown);
    
            card.appendChild(ratingContainer);

            const buyButton = document.createElement("button");
            buyButton.innerText = "Buy";
            card.appendChild(buyButton);

            gallery.appendChild(card);
        });
        
        
        // Add hover effect
        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                card.style.transform = "scale(1.05)";
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "scale(1)";
            });
        });
    }
    
    displayArtworks();
});