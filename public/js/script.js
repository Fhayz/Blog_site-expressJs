// script.js

// Function to toggle the visibility of the full content
function toggleContent(elementId) {
    var content = document.getElementById(elementId);
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  }
  