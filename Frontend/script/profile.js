// Add more interaction - Example: Hover effects for profile details
document.getElementById('profileDetails').addEventListener('mouseover', function() {
  this.style.transform = 'scale(1)';
});

document.getElementById('profileDetails').addEventListener('mouseout', function() {
  this.style.transform = 'scale(1)';
});

// Example: Adding a shake effect to the Change Password button
function shakeButton() {
  var button = document.getElementById('changePasswordBtn');
  button.classList.add('shake');
  setTimeout(function() {
    button.classList.remove('shake');
  }, 1000);
}

// Change Password Modal
function changePassword() {
  var modal = document.getElementById('changePasswordModal');
  modal.style.display = 'block';
}

// Close Change Password Modal
function closeChangePasswordModal() {
  var modal = document.getElementById('changePasswordModal');
  modal.style.display = 'none';
}

// Save Password Function (Add your logic here)

// Upload Artwork Modal
function uploadArtwork() {
  var modal = document.getElementById('uploadArtworkModal');
  modal.style.display = 'block';
}

// Close Upload Artwork Modal
function closeUploadArtworkModal() {
  var modal = document.getElementById('uploadArtworkModal');
  modal.style.display = 'none';
}
// Function to close the upload artwork modal with a smooth transition
function closeUploadArtworkModal() {
  var modal = document.getElementById('uploadArtworkModal');
  modal.style.opacity = '0'; // Smoothly transition to opacity 0
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300); // Wait for the transition before hiding
}
