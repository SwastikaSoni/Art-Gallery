const elementsToFade = document.querySelectorAll('.fade-element');
const footer = document.querySelector('.footer');
const signupSection = document.getElementById('signup-section');
const signinSection = document.getElementById('signin-section');
const signupModal = document.getElementById('signup-modal');
const modalTitle = document.getElementById('modal-title');
const signupButton = document.getElementById('signup-button');
const signinButton = document.getElementById('signin-button');
const madhubani = document.getElementById('madhubani');
const mysore = document.getElementById('mysore');
const thangka = document.getElementById('thangka');
const phad = document.getElementById('phad');
const kalam = document.getElementById('kalam');
let isAuthenticated = false;
// Function to open the modal
function openModal() {
  if (!isAuthenticated) {
    signupModal.style.display = 'block';
  } else {
    signupModal.style.display = 'block';
    // Set the modal title to 'Sign Up' by default
    modalTitle.textContent = 'Sign Up';
  }
}
const handleJoinUsClick = (event) => {
  event.preventDefault();
  openModal(event);
};
function handleCartLinkClick(event) {
  event.preventDefault();
  openModal(event);
}

// Named function for handling "Profile" link click
function handleProfileLinkClick(event) {
  event.preventDefault();
  openModal(event);
}
function handleMadhubaniClick(event) {
  event.preventDefault();
  openModal(event);
}
function handleMysoreClick(event) {
  event.preventDefault();
  openModal(event);
}
function handlePhadClick(event) {
  event.preventDefault();
  openModal(event);
}
function handleKalamClick(event) {
  event.preventDefault();
  openModal(event);
}
function handleThangkaClick(event) {
  event.preventDefault();
  openModal(event);
}
// Get the "Join Us" button and add a click event listener
const joinUsButton = document.querySelector('.button1');
joinUsButton.addEventListener('click', handleJoinUsClick);

const cartLink = document.querySelector('.cart');
  cartLink.addEventListener('click',handleCartLinkClick);

const profileLink = document.querySelector('.login-icon');
  profileLink.addEventListener('click', handleProfileLinkClick);
  madhubani.addEventListener('click',handleMadhubaniClick);
  mysore.addEventListener('click',handleMysoreClick)
  phad.addEventListener('click',handlePhadClick)
  kalam.addEventListener('click',handleKalamClick)
  thangka.addEventListener('click',handleThangkaClick)

// Function to close the modal
function closeModal() {
  signupModal.style.display = 'none';
}

// Function to toggle between Sign Up and Sign In
function toggleLogin() {
  if (modalTitle.textContent === 'Sign Up') {
    // Switch to Sign In
    modalTitle.textContent = 'Sign In';
    signupSection.style.display = 'none';
    signinSection.style.display = 'block';
  } else {
    // Switch to Sign Up
    modalTitle.textContent = 'Sign Up';
    signupSection.style.display = 'block';
    signinSection.style.display = 'none';
  }
}
function closeModal() {
  document.getElementById('signup-modal').style.display = 'none';
}

function removeEventListeners() {
  joinUsButton.removeEventListener('click', handleJoinUsClick);
  cartLink.removeEventListener('click', handleCartLinkClick);
  profileLink.removeEventListener('click', handleProfileLinkClick);
  madhubani.removeEventListener('click',handleMadhubaniClick)
  mysore.removeEventListenerListener('click',handleMysoreClick)
  phad.removeEventListenerListener('click',handlePhadClick)
  kalam.removeEventListener('click',handleKalamClick)
  thangka.removeEventListener('click',handleThangkaClick)
}



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


async function signup() {
  const name = document.getElementById('nameInput').value;
  const dob = document.getElementById('dobInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  const address = document.getElementById('addressInput').value;

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, dob, email, password, address }),
    });

    const responseData = await response.json();
    
    if (responseData.message === "User registered successfully") {
      console.log('Signup successful!');
      window.location.href = 'home.html';
    } else {
      console.log('Signup failed. Server response:', responseData);
      alert('Signup failed. Please check your details and try again.');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    alert('An error occurred during signup. Please try again.');
  } finally {
    closeModal();
    removeEventListeners();
  }
}


async function signin() {
  const email = document.getElementById('signinEmailInput').value;
  const password = document.getElementById('signinPasswordInput').value;

  try {
    const response = await fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();
    console.log('Signin response:', responseData);

    if (responseData.message === "User signed in successfully") {
      console.log('Signin successful!');
      window.location.href = 'home.html';
    } else {
      console.log('Signin failed. Server response:', responseData);
      alert('Signin failed. Check email and password.');
    }
  } catch (error) {
    console.error('Error during signin:', error);
    alert('An error occurred during signin. Please try again.');
  } finally {
    closeModal();
    removeEventListeners();
  }
}




signupButton.addEventListener('click', signup);
signinButton.addEventListener('click', signin);
