document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const priceFilter = document.getElementById("priceFilter");
    const ratingFilter = document.getElementById("ratingFilter");

    // Simulated database data
    const artworks = [
        { id: 1, title: "Artwork 1", artist: "Artist A", price: 200, rating: 4.5, imageUrl: "images/thangka_cards.jpeg" },
        { id: 2, title: "Artwork 2", artist: "Artist B", price: 150, rating: 4.0, imageUrl: "images/thangka_cards.jpeg" },
        { id: 3, title: "Artwork 3", artist: "Artist C", price: 300, rating: 4.8, imageUrl: "images/thangka_cards.jpeg" },
        { id: 1, title: "Artwork 1", artist: "Artist A", price: 200, rating: 4.5, imageUrl: "images/thangka_cards.jpeg" },
        { id: 2, title: "Artwork 2", artist: "Artist B", price: 150, rating: 4.0, imageUrl: "images/thangka_cards.jpeg" },
        { id: 3, title: "Artwork 3", artist: "Artist C", price: 300, rating: 3.9, imageUrl: "images/thangka_cards.jpeg" },
        { id: 2, title: "Artwork 2", artist: "Artist B", price: 150, rating: 4.0, imageUrl: "images/thangka_cards.jpeg" },
        { id: 3, title: "Artwork 3", artist: "Artist C", price: 300, rating: 4.8, imageUrl: "images/thangka_cards.jpeg" },
        // Add more artwork objects here
    ];

    // Sort and display the artwork cards based on the selected filters
    priceFilter.addEventListener("change", updateGallery);
    ratingFilter.addEventListener("change", updateGallery);

    function updateGallery() {
        const priceSort = priceFilter.value === "highToLow" ? -1 : 1;
        const ratingSort = ratingFilter.value === "highToLow" ? -1 : 1;

        const sortedArtworks = artworks.sort((a, b) => {
            return a.price * priceSort - b.price * priceSort || a.rating * ratingSort - b.rating * ratingSort;
        });

        displayArtworks(sortedArtworks);
    }

    
    function displayArtworks(artworks) {
        gallery.innerHTML = "";

        artworks.forEach((artwork, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const image = document.createElement("img");
            image.src = "placeholder.jpg"; // Placeholder image
            image.dataset.src = artwork.imageUrl; // Store the actual image URL in a data attribute
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
            title.innerText = artwork.title;
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
                const previousTotalArtworks = 100; // Get the previous total number of artworks
            
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

    updateGallery();
});



