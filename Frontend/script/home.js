const elementsToFade = document.querySelectorAll('.fade-element');
const footer = document.querySelector('.footer');
function handleScroll() {
    const windowHeight = window.innerHeight;
  
    // Get the footer's position
    const footerPosition = footer.getBoundingClientRect().top;
  
    // Check if the footer is in or near the viewport
    if (footerPosition < windowHeight) {
      // Footer is in or near the viewport, stop the fading effect
      elementsToFade.forEach(element => {
        element.style.opacity = 1;
      });
      return; // Exit the function
    }
  
    elementsToFade.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
  
      // Calculate the opacity based on the element's position
      const opacity = 1 - (elementPosition / windowHeight);
  
      // Apply the opacity to the element
      element.style.opacity = opacity;
    });
  }
  
  // Attach the scroll and wheel event listeners
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('wheel', handleScroll);
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
  
      if (targetSection) {
        window.scrollTo({
          behavior: 'smooth',
          top: targetSection.offsetTop,
        });
      }
    });
  });
  function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Add click event listeners to anchor tags
  const anchorTags = document.getElementById('section1');
  anchorTags.forEach((tag) => {
    tag.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent the default behavior of anchor tags
      const targetId = e.target.getAttribute('href').slice(1); // Get the target section's ID
      smoothScroll(targetId); // Call the smooth scroll function
    });
  });
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log('User Details:', user);
  